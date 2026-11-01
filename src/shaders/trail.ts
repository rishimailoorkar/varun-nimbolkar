export const vertexShader = /* glsl */ `
varying vec2 vUv;
void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}
`;

const noise = /* glsl */ `
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.;float a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=mat2(.8,-.6,.6,.8)*p*2.03;a*=.5;}return v;}
`;

export const trailFragment = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uPrevious;
uniform vec2 uSize,uFrom,uTo;
uniform float uDelta,uDecay,uRadius,uSpeed,uPaint,uTime,uNoise,uScale;
${noise}
void main(){
 vec4 previous=texture2D(uPrevious,vUv);
 float decay=exp(-uDelta*3.8/uDecay);
 float old=previous.r*decay;
 vec2 p=vUv*uSize;
 vec2 a=uFrom*uSize,b=uTo*uSize,d=b-a;
 float h=clamp(dot(p-a,d)/max(dot(d,d),.001),0.,1.);
 float radius=uRadius*(.27+.65*uSpeed);
 vec2 field=p/uSize.y*uScale;
 vec2 warp=vec2(fbm(field*3.+uTime*.18),fbm(field*3.+17.-uTime*.14))-.5;
 float dist=length(p-(a+h*d)+warp*radius*uNoise*1.8);
 float rough=fbm(field*11.+uTime*.24);
 float brush=1.-smoothstep(radius*.12,radius*(.58+.75*rough),dist);
 brush*=smoothstep(.13,.48,rough+noise(p*.12)*.2);
 brush*=uPaint;
 float density=max(old,brush);
 float speed=max(previous.g*decay,brush*uSpeed);
 gl_FragColor=vec4(density,speed,0.,1.);
}`;

export const revealFragment = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uMono,uColor,uTrail;
uniform vec2 uSize;
uniform float uTime,uNoise,uScale,uDistortion,uRgb;
${noise}
void main(){
 // Identical object-fit: cover transform for both registered photographs.
 float imageAspect=1672./941.;float aspect=uSize.x/uSize.y;
 vec2 crop=aspect>imageAspect?vec2(1.,imageAspect/aspect):vec2(aspect/imageAspect,1.);
 vec2 uv=(vUv-.5)*crop+.5;
 vec4 trail=texture2D(uTrail,vUv);
 vec2 p=vUv*vec2(aspect,1.);
 float n=fbm(p*uScale*3.+uTime*.22);
 float grain=hash(floor(vUv*uSize)+floor(uTime*24.));
 float mask=smoothstep(.045,.48,trail.r+(n-.5)*.26*trail.r);
 // Protect the central face/hands/sitar from displacement while retaining colour.
 float protection=1.-smoothstep(.20,.36,abs(uv.x-.5));
 float energy=mask*trail.g*(1.-.94*protection);
 vec2 shift=(vec2(n,fbm(p*uScale*5.+23.))-.5)*uDistortion*energy*uNoise;
 shift.x+=(noise(vec2(floor(vUv.y*uSize.y*.3),floor(uTime*12.)))-.5)*uDistortion*.15*energy;
 vec2 split=vec2(uRgb*energy,0.);
 vec3 color=vec3(texture2D(uColor,uv+shift+split).r,texture2D(uColor,uv+shift).g,texture2D(uColor,uv+shift-split).b);
 color+=(grain-.5)*.055*uNoise*mask;
 gl_FragColor=vec4(mix(texture2D(uMono,uv).rgb,color,mask),1.);
}`;

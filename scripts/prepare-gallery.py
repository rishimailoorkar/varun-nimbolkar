from PIL import Image, ImageOps, ImageDraw
from pathlib import Path
import hashlib, json
root=Path('../Gallery-Images'); out=Path('public/images/gallery');out.mkdir(parents=True,exist_ok=True)
items={}; total=0
for path in sorted(root.rglob('*')):
 if path.suffix.lower() not in ['.jpg','.jpeg','.png','.webp']: continue
 total+=1
 digest=hashlib.sha256(path.read_bytes()).hexdigest()[:16]
 category={'Cover':'Covers','Events':'Events','Sitars':'Sitars','Zia':'Zia'}.get(path.parent.name)
 if path.stem.lower().startswith('zia') and not category: category='Zia'
 if digest in items:
  if category and category not in items[digest]['categories']: items[digest]['categories'].append(category)
  continue
 with Image.open(path) as original:
  image=ImageOps.exif_transpose(original).convert('RGB');w,h=image.size
  variants=[]
  for size in [480,960,1440,2400]:
   width=min(size,w);height=round(h*width/w);target=out/f'{digest}-{size}.webp'
   if not target.exists(): image.resize((width,height),Image.Resampling.LANCZOS).save(target,'WEBP',quality=82 if size<2400 else 87,method=4)
   variants.append({'src':f'/images/gallery/{target.name}','width':width})
  items[digest]={'id':digest,'name':path.stem,'categories':[category] if category else [],'width':w,'height':h,'variants':variants,'alt':f"{category or 'Varun Nimbolkar'} — photograph {len(items)+1}"}
values=list(items.values())
Path('src/data/gallery.json').write_text(json.dumps(values,indent=2))
sheet=Image.new('RGB',(900,((len(values)+5)//6)*150),'#eeeeee');draw=ImageDraw.Draw(sheet)
for i,item in enumerate(values):
 im=Image.open('public'+item['variants'][0]['src']);im.thumbnail((140,120));x=(i%6)*150;y=(i//6)*150;sheet.paste(im,(x,y));draw.text((x,y+122),f"{i+1}: {item['name'][:17]}",fill='black')
sheet.save('qa-gallery-sheet.jpg')
print(f'{total} source images; {len(values)} unique images; {sum(p.stat().st_size for p in out.glob("*.webp"))//1024//1024} MB total responsive assets')
import runpy; runpy.run_path('scripts/describe-gallery.py')

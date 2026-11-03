from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak, KeepTogether, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from PIL import Image as PILImage
from pathlib import Path
import io
root=Path(__file__).resolve().parents[1]
out=root/'public/varun-nimbolkar-epk.pdf'
font_dir=Path('C:/Windows/Fonts')
pdfmetrics.registerFont(TTFont('Georgia',str(font_dir/'georgia.ttf')))
pdfmetrics.registerFont(TTFont('GeorgiaItalic',str(font_dir/'georgiai.ttf')))
pdfmetrics.registerFont(TTFont('Arial',str(font_dir/'arial.ttf')))
pdfmetrics.registerFont(TTFont('ArialBold',str(font_dir/'arialbd.ttf')))
black=colors.HexColor('#171717');gray=colors.HexColor('#666666');magenta=colors.HexColor('#bd3fce');orange=colors.HexColor('#e87835')
styles={
 'eyebrow':ParagraphStyle('eyebrow',fontName='ArialBold',fontSize=8,leading=12,textColor=magenta,spaceAfter=12),
 'title':ParagraphStyle('title',fontName='Georgia',fontSize=43,leading=47,textColor=black,spaceAfter=18),
 'section':ParagraphStyle('section',fontName='Georgia',fontSize=25,leading=31,textColor=black,spaceBefore=18,spaceAfter=13),
 'sub':ParagraphStyle('sub',fontName='ArialBold',fontSize=11,leading=16,textColor=black,spaceBefore=13,spaceAfter=6),
 'body':ParagraphStyle('body',fontName='Arial',fontSize=10.1,leading=16,textColor=black,spaceAfter=11),
 'small':ParagraphStyle('small',fontName='Arial',fontSize=8.5,leading=13,textColor=gray,spaceAfter=8),
 'link':ParagraphStyle('link',fontName='ArialBold',fontSize=9,leading=15,textColor=black,spaceAfter=8),
}
imgcache=[]
def photo(path,width,height):
 im=PILImage.open(path).convert('RGB'); im.thumbnail((1600,1200));buff=io.BytesIO();im.save(buff,'JPEG',quality=80);buff.seek(0);imgcache.append(buff)
 return Image(buff,width=width,height=height,kind='proportional')
def P(s,style='body'):return Paragraph(s,styles[style])
def item(head,body):return KeepTogether([P(head,'sub'),P(body)])
def link(label,url):return P(f'<link href="{url}" color="#9d39bb">{label}</link>','link')
story=[]
# Cover
story += [Spacer(1,32),P('ELECTRONIC PRESS KIT','eyebrow'),P('VARUN<br/>NIMBOLKAR','title'),P('Sitarist  /  Composer  /  Producer','body'),Spacer(1,10),photo(root/'public/images/contact-varun.jpg',460,308),Spacer(1,22),P('Classical roots. An evolving sound.','section'),P('Pune, India  •  Acoustic and electric sitar  •  Original music and live performance','small'),PageBreak()]
# Bio
story += [P('01 / THE ARTIST','eyebrow'),P('A modern voice for the sitar','title'),P('Varun Nimbolkar is a Pune-based composer, producer, performing sitar player and vocalist. He brings Indian classical training into conversation with electronic music, ambient soundscapes, rock and contemporary grooves.'),P('His classical foundation includes more than a decade studying under Ustad Usman Khan, along with time with Pt. Vijay Koparkar and mentorship under Pt. Kushal Das. That background informs a practice that moves between acoustic and electric sitar, effects pedals, live looping and original production.'),P('Across recordings and stages, Varun treats the sitar as a lead voice in evolving musical stories. His independent releases include <i>Bah Bah Black Sheep</i>, <i>Dreams for a Living</i> and <i>Watching Her Dance</i>.'),Spacer(1,14),photo(root/'public/images/home/about-varun.png',270,280),PageBreak()]
# Live
story += [P('02 / LIVE PERFORMANCE','eyebrow'),P('From intimate rooms to festival stages','title'),P('Varun presents two live formats that combine expressive sitar playing with contemporary production.'),item('SOLO SETS','An intimate exploration of acoustic and electric sitar, ethnic electronica, ambient textures and live looping. The format adapts to listening rooms, cultural venues, festivals and curated events.'),item('THE SITARA DEVI PROJECT','A full-ensemble show with The Sitara Devi &amp; her Bois, built for a larger, high-energy stage experience.'),P('Selected stages &amp; tours','section'),P('A six-city India tour; Magnetic Music at ZLB, Bengaluru; and a May 2026 UK tour through Manchester and London. The UK run included a 90-minute headline solo set at The Nehru Centre, the cultural wing of the High Commission of India, and appearances at Mind Body Spirit Festival, Happy Place Festival and World Yoga Festival.'),photo(root/'public/images/DSC00337.webp',460,260),PageBreak()]
# releases
story += [P('03 / RELEASES &amp; COLLABORATIONS','eyebrow'),P('Music across borders of genre','title'),item('BAH BAH BLACK SHEEP','An exploratory five-track EP placing Indian classical phrasing within electronic and cinematic soundscapes.'),item('DREAMS FOR A LIVING','An EP in which sitar-led composition meets rock and blues resonance.'),item('WATCHING HER DANCE','An acoustic single featured in Rolling Stone India and selected for FabIndia’s nationwide in-store playlist for a 12-month run.'),item('THODA SA — GUNDA feat. VARUN NIMBOLKAR &amp; UNKILL JI','Sitar contribution and production for the Azadi Records release. The official music video is available on YouTube.'),item('THE UNPOSTED LETTER','A collaboration with vocalist Saee Tembhekar, covered by Rockstreet Journal and Rolling Stone India.'),item('MAYA — DEREK &amp; THE CATS','Guest sitar on the track from <i>People to Meet, Places to See</i>.'),P('Other collaborations include projects with Tienas and singer-composer Amritha Thankachy.'),link('Watch Thoda Sa','https://www.youtube.com/watch?v=MtqOyo2ykPU'),PageBreak()]
# Work / Metrics
story += [P('04 / BEYOND THE STAGE','eyebrow'),P('A collaborator in sound','title'),P('Varun works with artists, labels, brands and film creators as a composer, producer and session musician. His approach blends sitar textures with hip-hop, electronica, blues rock and indie pop.'),item('BEATOVEN AI','Contributed a custom library of more than 400 sitar loops and phrases for Beatoven’s music composition platform.'),item('FABINDIA','<i>Watching Her Dance</i> was selected for continuous nationwide in-store rotation for twelve months.'),P('Audience at a glance','section'),P('400,000+ all-time streams across major digital platforms, including catalogue under The Ashwatth Project alias. 16,000+ peak monthly listeners across Spotify and streaming networks. 1,300+ followers across his independent music catalogue.'),P('These are historical milestones from the supplied artist content, rather than live counters.','small'),PageBreak()]
# Press
story += [P('05 / PRESS &amp; MEDIA','eyebrow'),P('In the conversation','title')]
press=[('Homegrown Magazine · October 2025','Indian Experimental Fusion EP Doubles Down On Emotive Storytelling','https://homegrown.co.in/homegrown-creators/varun-nimbolkars-indian-experimental-fusion-ep-doubles-down-on-emotive-storytelling'),('The Indian Music Diaries · October 2025','Bah Bah Black Sheep Sits Comfortably Between Indian Classical and Electronica','https://theindianmusicdiaries.com/varun-nimbolkars-bah-bah-black-sheep-sits-comfortably-between-indian-classical-and-electronica/'),('The Indian Music Diaries · January 2024','Dreams For A Living EP Melds Classical Essence With Rock Resonance','https://theindianmusicdiaries.com/varun-nimbolkars-dreams-for-a-living-ep-melds-classical-essence-with-rock-resonance/'),('Homegrown Magazine · February 2026','Art That Inspires: 7 Homegrown Musicians On The Books That Shaped Their Sound','https://homegrown.co.in/homegrown-creators/art-that-inspires-7-homegrown-musicians-on-the-books-that-shaped-their-sound'),('The Indian Music Diaries · June 2021','Singles Roundup #29: Diversify Your Playlist With These Latest Tracks','https://theindianmusicdiaries.com/singles-roundup-29-diversify-your-playlist-with-these-latest-tracks/')]
for source,title,url in press:story += [P(source,'small'),link(title,url),Spacer(1,7)]
story += [P('Further coverage of Derek &amp; The Cats’ <i>People to Meet, Places to See</i> also mentions Varun’s sitar contribution to “Maya”.'),PageBreak()]
# Booking
story += [P('06 / BOOKINGS &amp; LINKS','eyebrow'),P('Let’s make something sound','title'),P('Available for live performances, solo sitar sets, ensemble shows, studio sessions, composition and cross-genre collaborations.'),P('For booking enquiries, include the proposed date, city or venue, performance format, event details and budget where available.'),Spacer(1,20),link('Booking email: varun.nimbolkar@gmail.com','mailto:varun.nimbolkar@gmail.com'),link('Contact & booking form','https://varun-nimbolkar.vercel.app/contact'),link('Spotify','https://open.spotify.com/artist/3dmI9UkzIOZZeHcdLJfXZs'),link('Apple Music','https://music.apple.com/in/artist/varun-nimbolkar/1566186954'),link('YouTube','https://www.youtube.com/@varunnimbolkar'),link('Instagram','https://www.instagram.com/varun_nimbolkar/'),link('Gallery','https://varun-nimbolkar.vercel.app/gallery'),Spacer(1,60),P('VARUN NIMBOLKAR  /  ELECTRONIC PRESS KIT','eyebrow')]
def page(canvas,doc):
 canvas.saveState();w,h=A4;canvas.setStrokeColor(colors.HexColor('#dddddd'));canvas.line(48,45,w-48,45);canvas.setFont('Arial',8);canvas.setFillColor(gray);canvas.drawString(48,30,'VARUN NIMBOLKAR  /  ELECTRONIC PRESS KIT');canvas.drawRightString(w-48,30,f'{doc.page:02d}');canvas.restoreState()
SimpleDocTemplate(str(out),pagesize=A4,rightMargin=48,leftMargin=48,topMargin=50,bottomMargin=65,title='Varun Nimbolkar | Electronic Press Kit',author='Varun Nimbolkar').build(story,onFirstPage=page,onLaterPages=page)
print(out)

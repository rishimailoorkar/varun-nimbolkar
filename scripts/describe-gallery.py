import json
from pathlib import Path
p=Path('src/data/gallery.json');items=json.loads(p.read_text())
for item in items:
 n=item['name'];cats=item['categories']
 if 'Sitars' in cats: alt='Close-up of sitar strings, tuning pegs and carved wooden details'
 elif n in ['2','IMG_5711','preference 1','IMG_5713']: alt='Portrait of Varun Nimbolkar'
 elif n=='4': alt='Varun Nimbolkar playing sitar beside a sunlit yellow wall'
 elif n.startswith('zia'): alt='Varun Nimbolkar and fellow musicians in a live concert photograph'
 elif n in ['DSCF7983','DSCF7984','DSCF8269','HPY06790','HPY06820','DSC04116']: alt='Audience and stage during a Varun Nimbolkar live performance'
 elif n=='DSC00320': alt='Varun Nimbolkar standing in front of colourful wall artwork'
 else: alt='Varun Nimbolkar performing with his sitar'
 item['alt']=alt+' — '+n
p.write_text(json.dumps(items,indent=2))

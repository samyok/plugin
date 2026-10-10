const B=(cap,o={})=>Object.assign({cap},o);
window.VIDEO={title:'Demo · HTTP caching',palette:{fresh:'#3ddc84',stale:'#ff9a3c',origin:'#4c8dff'},chapters:[
{title:'Who is involved',elements:[
 {id:'br',type:'box',x:140,y:380,w:380,h:150,label:'Browser',sub:'private cache',color:'fresh'},
 {id:'cdn',type:'box',x:770,y:380,w:380,h:150,label:'CDN',sub:'shared cache',color:'fresh'},
 {id:'or',type:'box',x:1400,y:380,w:380,h:150,label:'Origin',sub:'app server',color:'origin'},
 {id:'a1',type:'arrow',from:[520,455],to:[770,455],color:'mute',label:'GET /logo.png'},
 {id:'a2',type:'arrow',from:[1150,455],to:[1400,455],color:'origin',label:'miss → fetch'},
],beats:[B('A request can be answered by three places.',{add:['br']}),B('A shared cache sits in the middle.',{add:['cdn','a1']}),B('Only a miss reaches the origin.',{add:['or','a2']})]},
{title:'The response headers',elements:[
 {id:'h',type:'json',x:140,y:200,w:760,title:'response headers',color:'origin',lines:['{','  "Cache-Control": "max-age=60",','  "ETag": "\\"v42\\"",','  "Age": "12"','}']},
 {id:'ttl',type:'bar',x:140,y:560,w:1640,color:'fresh',value:1,label:'Freshness (max-age 60 s)',marks:[{at:0.2,label:'stale after',color:'stale'}]},
 {id:'tl',type:'timeline',x:160,y:760,w:1600,ticks:[{at:0.1,label:'cached',up:true},{at:0.7,label:'revalidate',color:'stale',up:true}],spans:[{a:0.1,b:0.7,color:'fresh',label:'fresh'},{a:0.7,b:1,color:'stale',label:'stale'}]},
 {id:'st',type:'strip',x:140,y:860,cw:150,color:'stale',items:['req 1','req 2','req 3']},
],beats:[B('max-age says how long the copy stays fresh.',{add:['h'],json:{id:'h',line:1,note:'Seconds the response may be reused without asking.'}}),
 B('The freshness budget drains every second.',{add:['ttl'],anim:{id:'ttl',from:1,to:0.15}}),
 B('Then the cache must revalidate with the ETag.',{json:{id:'h',line:2,note:'Sent back as If-None-Match; 304 means reuse.'},add:['tl']}),
 B('Requests during the stale window wait on revalidation.',{add:['st'],idx:{id:'st',i:[1,2]}}),
 B('That is the whole loop.',{all:true})]}
]};

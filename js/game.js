/* ============ CONSTANTES ============ */
const W=960,H=540,PX=4,X0=200,X1=896,TOP=100;
const KEYS=['a','f','j','l'];
const DAY_MS=7000, BASE=0.42, HELP_EFF=0.7;
const PH_COL=['#5b8def','#8b7be8','#D97757','#4fb3a9','#5fd38d'];
const PHASES=[
  {name:'Requisitos',icon:'📋',desc:'o que construir'},
  {name:'Projeto',icon:'📐',desc:'como construir'},
  {name:'Implementação',icon:'⌨️',desc:'mão no código'},
  {name:'Testes',icon:'🧪',desc:'funciona mesmo?'},
  {name:'Deploy',icon:'🚀',desc:'pra produção'}
];
const PALETTES=[
  {hood:'#D97757',dark:'#a9533a',hair:'#3b2a20',skin:'#f1c7a0'},
  {hood:'#4fb3a9',dark:'#2f8178',hair:'#e8b04b',skin:'#c98e62'},
  {hood:'#8b7be8',dark:'#5e4fc0',hair:'#1b1b1f',skin:'#8d5a3b'},
  {hood:'#e8c547',dark:'#b8962a',hair:'#b5562f',skin:'#f5d3b3'}
];
const BOSS_LINES=['Cadê a entrega?!','O prazo era ONTEM!','Hoje tem hora extra...','O cliente tá ligando!','Isso vai pro RH...'];
const CODE_BITS=['{','}',';','</>','()','=>','01','#','[]','if','git'];

/* ============ BANCO DE PERGUNTAS (a resposta certa é sempre o índice 0; embaralha na hora) ============ */
const QUESTIONS=[
 [ // Requisitos
  {q:'Qual destes é um requisito NÃO-funcional?',o:['O sistema deve responder em até 2 segundos','O sistema deve gerar relatório de vendas','O usuário pode cadastrar produtos','O admin pode excluir contas'],e:'Requisitos não-funcionais descrevem qualidades do sistema (desempenho, segurança, usabilidade, disponibilidade), e não o que ele faz.'},
  {q:'Qual é o formato clássico de uma user story?',o:['Como <papel>, quero <ação>, para <benefício>','Dado <contexto>, quando <ação>, então <resultado>','Se <condição> então <ação>','Entrada → Processamento → Saída'],e:'"Como… quero… para…" é a user story. O "Dado/Quando/Então" (BDD) é usado para escrever os critérios de aceitação dela.'},
  {q:'O que é elicitação de requisitos?',o:['Descobrir as necessidades com os stakeholders (entrevistas, workshops, observação)','Escrever os testes automatizados','Escolher a linguagem de programação','Publicar o sistema em produção'],e:'Elicitar é extrair o que o cliente e os usuários realmente precisam — muitas vezes eles nem sabem explicar de primeira.'},
  {q:'Por que corrigir um erro de requisito logo no início é tão importante?',o:['Porque o custo de correção cresce muito nas fases seguintes','Porque requisitos nunca podem mudar','Porque o cliente não lê código','Porque testes não detectam erros'],e:'Um erro de requisito descoberto em produção pode custar dezenas de vezes mais do que se fosse corrigido na fase de requisitos.'},
  {q:'O que é "scope creep"?',o:['Aumento descontrolado do escopo sem ajustar prazo ou recursos','Uma técnica de estimativa ágil','Um tipo de teste de carga','A redução planejada do escopo'],e:'Scope creep é o escopo "rastejando" para cima: pedidos novos entram sem negociação de prazo — causa clássica de atraso.'}
 ],
 [ // Projeto
  {q:'Num bom projeto de software, queremos módulos com…',o:['Alta coesão e baixo acoplamento','Baixa coesão e alto acoplamento','Alta coesão e alto acoplamento','Um único módulo gigante'],e:'Alta coesão: cada módulo faz uma coisa bem feita. Baixo acoplamento: mudar um módulo não quebra os outros.'},
  {q:'Qual diagrama UML mostra a troca de mensagens entre objetos ao longo do tempo?',o:['Diagrama de sequência','Diagrama de classes','Diagrama de casos de uso','Diagrama de implantação'],e:'O diagrama de sequência ordena as mensagens no tempo (de cima para baixo) entre os objetos participantes.'},
  {q:'No SOLID, o "S" significa…',o:['Princípio da Responsabilidade Única','Segurança em primeiro lugar','Simplicidade do código','Sincronização de threads'],e:'Single Responsibility: uma classe deve ter um, e apenas um, motivo para mudar.'},
  {q:'Qual padrão de projeto garante que uma classe tenha uma única instância?',o:['Singleton','Observer','Adapter','Factory Method'],e:'Singleton restringe a criação a uma única instância com acesso global (use com moderação: dificulta testes).'},
  {q:'Para que serve o diagrama de casos de uso?',o:['Mostrar o que os atores podem fazer com o sistema','Mostrar as tabelas do banco de dados','Mostrar a ordem das chamadas de métodos','Mostrar os servidores da infraestrutura'],e:'Casos de uso mostram as funcionalidades do ponto de vista dos atores (usuários ou outros sistemas).'}
 ],
 [ // Implementação
  {q:'Para que serve o Git?',o:['Controle de versão: histórico, branches e colaboração no código','Compilar o código-fonte','Hospedar o banco de dados','Desenhar a interface'],e:'Com Git o time trabalha em paralelo em branches, revisa mudanças e consegue voltar a qualquer versão anterior.'},
  {q:'O que é débito técnico?',o:['O custo futuro dos atalhos tomados hoje no código','Dinheiro que a empresa deve ao desenvolvedor','Um defeito de hardware','O tempo de compilação do projeto'],e:'Como uma dívida: o atalho economiza tempo agora, mas cobra "juros" depois em bugs e lentidão para mudar o código.'},
  {q:'Refatorar significa…',o:['Melhorar a estrutura interna do código sem mudar o comportamento externo','Adicionar novas funcionalidades','Reescrever tudo em outra linguagem','Apagar os testes que falham'],e:'Refatoração é arrumar a casa: nomes melhores, menos duplicação, funções menores — e o sistema continua fazendo a mesma coisa.'},
  {q:'Qual é o principal objetivo do code review?',o:['Achar problemas cedo e espalhar conhecimento pelo time','Encontrar culpados pelos bugs','Aumentar o número de linhas de código','Substituir os testes automatizados'],e:'Revisão de código melhora a qualidade e evita que só uma pessoa entenda cada parte do sistema.'},
  {q:'No pair programming, os dois papéis são…',o:['Piloto (driver) e navegador (navigator)','Chefe e estagiário','Frontend e backend','Testador e cliente'],e:'O piloto digita; o navegador revisa em tempo real e pensa no próximo passo. Eles trocam de papel com frequência.'}
 ],
 [ // Testes
  {q:'Um teste unitário verifica…',o:['A menor parte isolada do código, como uma função','O sistema inteiro com usuários reais','Só a interface gráfica','O desempenho do servidor sob carga'],e:'Testes unitários são rápidos e isolados; formam a base da pirâmide de testes.'},
  {q:'No TDD, qual é a ordem do ciclo?',o:['Vermelho → Verde → Refatorar','Codar → Testar → Publicar','Verde → Vermelho → Deploy','Refatorar → Codar → Vermelho'],e:'Escreve um teste que falha (vermelho), faz o mínimo para passar (verde) e depois melhora o código (refatorar).'},
  {q:'Teste de caixa-preta é aquele que…',o:['Testa entradas e saídas sem olhar o código interno','Analisa o código linha por linha','Só roda em produção','É feito apenas pelo programador'],e:'Caixa-preta olha o comportamento pela especificação. Caixa-branca usa o conhecimento da estrutura interna (caminhos, desvios).'},
  {q:'Para que serve o teste de regressão?',o:['Garantir que mudanças novas não quebraram o que já funcionava','Medir a velocidade do time','Voltar para a versão anterior','Testar só funcionalidades novas'],e:'Toda mudança pode quebrar algo antigo; a suíte de regressão (de preferência automatizada) pega isso.'},
  {q:'"Estamos construindo o produto CERTO?" é uma pergunta de…',o:['Validação','Verificação','Depuração','Integração'],e:'Validação = produto certo (atende o cliente). Verificação = produto construído certo (atende a especificação).'}
 ],
 [ // Deploy
  {q:'CI/CD significa…',o:['Integração Contínua e Entrega/Implantação Contínua','Código Interno e Código Distribuído','Controle de Issues e Correção de Defeitos','Compilação Incremental e Compilação Direta'],e:'Cada commit é integrado e testado automaticamente (CI) e pode ir para produção de forma automatizada (CD).'},
  {q:'No Scrum, quem prioriza o Product Backlog?',o:['Product Owner','Scrum Master','Os desenvolvedores','O cliente final'],e:'O Product Owner é responsável por maximizar o valor do produto, ordenando o backlog.'},
  {q:'O que é um MVP?',o:['Produto Mínimo Viável: a menor versão que entrega valor e gera aprendizado','O jogador mais valioso do time','A versão final e completa do produto','Um protótipo só de telas, sem funcionar'],e:'O MVP serve para testar hipóteses com usuários reais o quanto antes, gastando o mínimo.'},
  {q:'A Lei de Brooks diz que…',o:['Adicionar pessoas a um projeto atrasado tende a atrasá-lo ainda mais','Todo projeto atrasa o dobro do previsto','Quanto mais testes, menos bugs','Código bom não precisa de documentação'],e:'Gente nova precisa de tempo para entrar no contexto e aumenta a comunicação. Por isso a ajuda no jogo rende só 70%.'},
  {q:'Qual evento do Scrum mostra o incremento pronto aos stakeholders?',o:['Sprint Review','Daily Scrum','Sprint Retrospective','Sprint Planning'],e:'Na Review o time mostra o que foi feito e coleta feedback. A Retrospectiva é para o time melhorar o próprio processo.'},
  {q:'O que é um rollback?',o:['Voltar para a última versão estável quando um deploy dá problema','Desfazer o último commit local','Reiniciar o servidor','Apagar o banco de dados'],e:'Ter rollback rápido e seguro é parte essencial de um bom processo de entrega.'}
 ]
];

/* ============ SPRITES (pixel art original) ============ */
const BODY=[
"...hhhhhh...",
"..hhhhhhhh..",
".hhhhhhhhhh.",
".hssssssssh.",
".ssksssskss.",
".ssssssssss.",
"..sssmmsss..",
"...ssssss...",
"..cccccccc..",
".cdccccccdc.",
"sccllllllccs",
".dclwwwwlcd.",
"..pp....pp..",
"..bb....bb.."];
const BOSS=[
"....ssss....",
"..ssssssss..",
".gssssssssg.",
".gsKssssKsg.",
".ssksssskss.",
".ssssssssss.",
"..ssmmmmss..",
"...ssssss...",
"..uuuwwuuu..",
".uuuuttuuuu.",
"suuuuttuuuus",
".uuuuttuuuu.",
"..pp....pp..",
"..bb....bb.."];
const BUG=[
"a......a",
".a.gg.a.",
"..gggg..",
"gggkkggg",
"..gggg..",
"g.g..g.g"];

function devRows(mood,blink,leg){
  const r=BODY.slice();
  if(blink) r[4]='.ssssssssss.';
  if(mood==='happy'){r[6]='..smssssms..';r[7]='...smmmms...';}
  else if(mood==='worried'){r[6]='..ssmmmmss..';}
  if(leg){r[12]='...pp..pp...';r[13]='...bb..bb...';}
  return r;
}
function toGray(hex){
  const n=parseInt(hex.slice(1),16),r=n>>16&255,g=n>>8&255,b=n&255;
  const l=Math.round((.3*r+.59*g+.11*b)*.7);
  return `rgb(${l},${l},${l+6})`;
}
function drawMap(c,map,ox,oy,cols,s,gray){
  for(let r=0;r<map.length;r++){const row=map[r];
    for(let k=0;k<row.length;k++){const ch=row[k]; if(ch==='.')continue; let col=cols[ch]; if(!col)continue;
      c.fillStyle=gray?toGray(col):col; c.fillRect(Math.round(ox+k*s),Math.round(oy+r*s),s,s);}}
}
function px(c,ox,oy,x,y,w,h,col){c.fillStyle=col;c.fillRect(Math.round(ox+x*PX),Math.round(oy+y*PX),w*PX,h*PX);}
function drawDevSprite(c,slot,ox,oy,o){
  const P=PALETTES[slot], G=x=>o.gray?toGray(x):x;
  const cols={h:P.hair,s:P.skin,k:'#15161a',m:'#7a2e2e',c:P.hood,d:P.dark,l:'#5b6170',
    w:o.typing?(o.flick?'#d8f7ff':'#8fdcff'):'#4e7f99',p:'#34405a',b:'#1c1c24'};
  drawMap(c,devRows(o.mood,o.blink,o.leg),ox,oy,cols,PX,o.gray);
  // acessórios (um por dev)
  if(slot===0){px(c,ox,oy,2,-1,8,1,G('#2a2a2a'));px(c,ox,oy,1,0,1,2,G('#2a2a2a'));px(c,ox,oy,10,0,1,2,G('#2a2a2a'));px(c,ox,oy,0,3,1,3,G(P.dark));px(c,ox,oy,11,3,1,3,G(P.dark));}
  if(slot===1){px(c,ox,oy,2,-1,8,1,G(P.hood));px(c,ox,oy,1,0,10,2,G(P.hood));px(c,ox,oy,6,2,6,1,G(P.dark));}
  if(slot===2){const f=G('#e8e6e1');px(c,ox,oy,2,3,3,1,f);px(c,ox,oy,7,3,3,1,f);px(c,ox,oy,2,4,1,1,f);px(c,ox,oy,4,4,1,1,f);px(c,ox,oy,7,4,1,1,f);px(c,ox,oy,9,4,1,1,f);px(c,ox,oy,5,4,2,1,f);}
  if(slot===3){px(c,ox,oy,4,-2,4,2,G(P.hair));px(c,ox,oy,5,-3,2,1,G(P.hair));}
  if(o.sweat){const t=Math.floor(o.t*5)%3;px(c,ox,oy,11,1+t,1,2,'#7fd3ff');}
  if(o.box){px(c,ox,oy,1,9,10,4,'#a0723f');px(c,ox,oy,1,9,10,1,'#7d5630');px(c,ox,oy,8,7,1,2,'#5fd38d');px(c,ox,oy,9,6,1,1,'#5fd38d');px(c,ox,oy,3,8,2,1,'#e8e6e1');}
}

/* ============ CANVAS ============ */
const $=s=>document.querySelector(s);
const cv=$('#stage'), g=cv.getContext('2d');
const DPR=Math.min(2,window.devicePixelRatio||1);
cv.width=W*DPR; cv.height=H*DPR; g.setTransform(DPR,0,0,DPR,0,0); g.imageSmoothingEnabled=false;
const pv=$('#preview'), pg=pv.getContext('2d');
pv.width=640*DPR; pv.height=110*DPR; pg.setTransform(DPR,0,0,DPR,0,0); pg.imageSmoothingEnabled=false;

/* ============ ESTADO ============ */
let state='setup', devs=[], D=10, gameTime=0, nextWarn=0, eventTimer=7, modalQueue=[], particles=[], usedQ=[], scopeCount=0, animTime=0, laneH=110, ending=false, modalHandler=null;
let cfg={days:10,slots:[
  {on:true,name:'Você',human:true},{on:true,name:'Bia',human:false},
  {on:true,name:'Léo',human:false},{on:true,name:'Rafa',human:false}]};

/* ============ SOM ============ */
let actx=null, muted=false;
function beep(f,dur=.08,type='square',vol=.04,slide=0){
  if(muted||!actx)return;
  try{const t=actx.currentTime,o=actx.createOscillator(),gn=actx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);
  if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(40,f+slide),t+dur);
  gn.gain.setValueAtTime(vol,t);gn.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(gn).connect(actx.destination);o.start(t);o.stop(t+dur+.02);}catch(e){}
}
const SFX={
  key:()=>beep(900+Math.random()*400,.025,'square',.012),
  bug:()=>beep(240,.18,'sawtooth',.05,-140),
  squash:()=>beep(520,.12,'square',.05,500),
  ok:()=>{beep(660,.08);setTimeout(()=>beep(990,.14),90)},
  bad:()=>beep(200,.3,'sawtooth',.05,-90),
  warn:()=>{beep(150,.3,'sawtooth',.07);setTimeout(()=>beep(110,.4,'sawtooth',.07),260)},
  done:()=>[523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,.12,'square',.05),i*90)),
  fired:()=>[392,330,262,196].forEach((f,i)=>setTimeout(()=>beep(f,.2,'triangle',.08),i*160)),
  event:()=>beep(440,.1,'triangle',.05,200)
};

/* ============ UTIL ============ */
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function dayNow(){return gameTime/DAY_MS}
function feed(msg,cls=''){
  const f=$('#feed'),el=document.createElement('div');
  const dn=Math.floor(dayNow())+1;
  el.innerHTML=`<span class="t">[dia ${dn>D?D+'+'+(dn-D):dn}]</span><span class="${cls}">${msg}</span>`;
  f.prepend(el); while(f.children.length>60)f.lastChild.remove();
}
function toast(html,cls='',ms=2200){
  const t=document.createElement('div');t.className='toast '+cls;t.innerHTML=html;$('#toasts').appendChild(t);
  setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),320)},ms);
}
function laneY(i){return TOP+i*laneH}
function devX(d){return X0+d.disp/100*(X1-X0)}
function idealP(){return Math.min(100,gameTime/(D*DAY_MS)*100)}
function speed(d){let m=Math.max(.6,1-.07*d.debt)*Math.pow(.82,d.warnings);if(d.coffee>0)m*=1.5;return m}
function bugChance(d){return .011*(1+.45*d.debt+.5*d.warnings)}
function pending(){return devs.filter(o=>!o.done&&!o.fired)}

/* ============ PARTÍCULAS ============ */
function spawnText(x,y,txt,col){particles.push({x,y,vx:(Math.random()-.5)*40,vy:-55-Math.random()*30,life:.9,max:.9,txt,col})}
function burst(x,y,n,cols){for(let i=0;i<n;i++)particles.push({x,y,vx:(Math.random()-.5)*280,vy:-Math.random()*260-40,life:1.2,max:1.2,col:cols[i%cols.length],sq:3+(Math.random()*3|0),grav:480})}

/* ============ JOGO ============ */
function makeDev(slot,s,idx){
  return {idx,slot,name:s.name.trim()||('Dev '+(slot+1)),human:s.human,key:KEYS[slot],pal:PALETTES[slot],
    progress:0,disp:0,gates:0,gatePending:false,gateTimer:0,debt:0,warnings:0,fired:false,firedT:0,done:false,doneT:0,
    finishTime:null,onTime:false,bug:null,frozen:0,coffee:0,helping:null,choice:null,bonus:0,bonusR:0,donated:0,received:0,
    correct:0,wrong:0,lastWork:-9,botRate:[5.5,4.9,4.3,5.1][slot]+(Math.random()-.5)*.8,botAcc:.68+Math.random()*.2,botTimer:Math.random()*.3,bossLine:0};
}
function startGame(){
  const on=cfg.slots.map((s,i)=>({s,i})).filter(x=>x.s.on);
  devs=on.map((x,k)=>makeDev(x.i,x.s,k));
  D=cfg.days; gameTime=0; nextWarn=0; eventTimer=6+Math.random()*3; modalQueue=[]; particles=[]; scopeCount=0; ending=false;
  usedQ=PHASES.map(()=>new Set()); laneH=(H-TOP-10)/devs.length;
  $('#feed').innerHTML=''; $('#toasts').innerHTML='';
  buildPads();
  $('#setup').classList.add('hidden'); $('#end').classList.add('hidden'); $('#modal').classList.add('hidden');
  state='play';
  feed(`🏁 Sprint iniciada! Deadline em <b>${D} dias</b>. ${devs.filter(d=>d.human).map(d=>`${esc(d.name)}: tecla <b>${d.key.toUpperCase()}</b>`).join(' · ')||'Modo demonstração (só CPUs).'}`,'warn');
  toast('🏁 SPRINT INICIADA!','good',1600);
}

function press(i,byHuman){
  if(state!=='play')return;
  const d=devs[i]; if(!d||d.fired)return;
  if(d.done){
    if(d.helping==null)return;
    const t=devs[d.helping];
    if(!t||t.done||t.fired){retarget(d);return}
    work(t,HELP_EFF,d,byHuman); return;
  }
  work(d,1,null,byHuman);
}
function work(d,eff,helper,byHuman){
  if(d.frozen>0||d.gatePending)return;
  d.lastWork=animTime; if(helper)helper.lastWork=animTime;
  if(byHuman)SFX.key();
  const y=laneY(d.idx)+laneH-40;
  if(d.bug){
    d.bug.hp--; d.bug.hit=animTime;
    if(d.bug.hp<=0){
      d.bug=null; burst(devX(d)+34,y,16,['#6fdc6f','#b8f5b8','#2e8b2e']);
      if(byHuman)SFX.squash();
      feed(`✅ ${helper?esc(helper.name)+' e '+esc(d.name)+' depuraram o bug em par.':esc(d.name)+' depurou o bug.'}`,'good');
    }
    return;
  }
  const amt=helper? BASE*HELP_EFF*Math.max(.6,1-.07*d.debt)*(helper.coffee>0?1.5:1) : BASE*speed(d);
  const nextGate=(d.gates+1)*20;
  const real=Math.min(amt,nextGate-d.progress);
  if(helper){helper.donated+=real; d.received+=real;}
  if(d.progress+amt>=nextGate){d.progress=nextGate; triggerGate(d); return;}
  d.progress+=amt;
  if(Math.random()<bugChance(d))spawnBug(d);
  if(Math.random()<.3)spawnText(devX(d)+(Math.random()*20-10),y-10,CODE_BITS[Math.random()*CODE_BITS.length|0],(helper||d).pal.hood);
}
function spawnBug(d,reason){
  d.bug={hp:7,max:7,born:animTime,hit:-9};
  feed(`🐛 ${reason?reason+' — ':''}bug no código de <b>${esc(d.name)}</b>!${d.human?' Aperte para depurar.':''}`,'bad');
  if(d.human||devs.some(h=>h.human&&h.helping===d.idx))SFX.bug();
}
function triggerGate(d){
  d.gatePending=true;
  if(d.human&&!d.done) enqueue({type:'q',dev:d});
  else d.gateTimer=.9+Math.random()*.7;
}
function resolveGate(d,ok){
  d.gatePending=false;
  const ph=d.gates;
  if(ok)d.correct++; else {d.wrong++; d.debt++;}
  if(ph===4){
    if(ok){d.gates=5; finish(d);}
    else {d.progress=94; d.disp=Math.min(d.disp,94); feed(`💥 Deploy de <b>${esc(d.name)}</b> falhou! Rollback para 94%.`,'bad');}
  } else {
    d.gates++;
    if(ok)d.progress=Math.min(d.progress+3,(d.gates+1)*20-.5);
  }
}
function resolveBotGate(d){
  const ok=Math.random()<d.botAcc, ph=d.gates;
  feed(`${ok?'✅':'❌'} ${esc(d.name)} ${ok?'passou':'errou'} na revisão de ${PHASES[ph].name}${ok?'':' — débito técnico +1'}.`,ok?'':'warn');
  resolveGate(d,ok);
}
function finish(d){
  d.done=true; d.progress=100; d.finishTime=gameTime; d.onTime=gameTime<=D*DAY_MS; d.bug=null; d.doneT=animTime;
  burst(X1,laneY(d.idx)+laneH-50,40,[d.pal.hood,'#fff','#f2c14e','#5fd38d']);
  SFX.done();
  toast(`🚀 ${esc(d.name)} ENTREGOU${d.onTime?'!':' (atrasado)'}`,'good',2000);
  feed(`🚀 <b>${esc(d.name)}</b> entregou ${d.onTime?'no prazo':'com atraso'} (dia ${dayNow().toFixed(1)}).`,'good');
  devs.forEach(h=>{if(h.helping===d.idx)retarget(h)});
  if(pending().length){ if(d.human)enqueue({type:'c',dev:d}); else botChoose(d); }
}
function mostBehind(ex){const c=devs.filter(o=>o!==ex&&!o.done&&!o.fired);c.sort((a,b)=>a.progress-b.progress);return c[0]||null}
function retarget(h){
  const t=mostBehind(h), prev=h.helping;
  h.helping=t?t.idx:null;
  if(t&&prev!=null&&prev!==t.idx)feed(`🤝 ${esc(h.name)} agora faz par com ${esc(t.name)}.`);
}
function bonusFor(d){const early=Math.max(0,(D*DAY_MS-d.finishTime)/DAY_MS);return {early,pts:Math.round(early*200),r:Math.round(early*500/50)*50}}
function botChoose(d){
  if(d.onTime&&Math.random()<.4){const b=bonusFor(d);d.choice='bonus';d.bonus=b.pts;d.bonusR=b.r;feed(`💰 ${esc(d.name)} pegou o bônus de R$ ${b.r} e foi descansar.`,'warn');}
  else {d.choice='help';retarget(d);if(d.helping!=null)feed(`🤝 ${esc(d.name)} decidiu fazer pair programming com ${esc(devs[d.helping].name)}.`,'good');}
}
function fire(d){
  d.fired=true;d.bug=null;d.gatePending=false;d.firedT=animTime;
  modalQueue=modalQueue.filter(it=>it.dev!==d);
  devs.forEach(h=>{if(h.helping===d.idx)retarget(h)});
  toast(`📦 ${esc(d.name)} FOI DEMITIDO`,'bad',2800);
  feed(`📦 <b>${esc(d.name)}</b> recebeu o 3º aviso e foi demitido. O módulo dele não será entregue.`,'bad');
  SFX.fired();
}
function issueWarnings(k){
  const late=pending();
  if(k===0&&late.length){toast('⏰ DEADLINE!<br>Quem não entregou leva aviso.','bad',2600);feed('⏰ <b>DEADLINE</b> — começou a hora extra.','bad');}
  late.forEach(d=>{
    d.warnings=k+1;
    if(d.warnings>=3)fire(d);
    else {toast(`📄 AVISO DE DEMISSÃO Nº${d.warnings}<br>${esc(d.name)}`,'bad',2500);
      feed(`📄 Aviso de demissão nº${d.warnings} para <b>${esc(d.name)}</b>: mais lento, mais bugs e o chefe na cola.`,'bad');}
  });
  if(late.length)SFX.warn();
}
const EVENTS=[
  {w:3,run:d=>{d.frozen=2.2;feed(`📞 Reunião surpresa! ${esc(d.name)} ficou 2s parado (interrupções quebram o foco).`,'warn')}},
  {w:2,run:d=>{const fl=d.gates*20;d.progress=Math.max(fl,d.progress-6);scopeCount++;feed(`🔄 O cliente mudou o requisito! ${esc(d.name)} perdeu 6% (scope creep).`,'warn')}},
  {w:3,run:d=>{d.coffee=4;feed(`☕ ${esc(d.name)} tomou um café: +50% de velocidade por 4s.`)}},
  {w:2,run:d=>{spawnBug(d,'O CI quebrou')}}
];
function randomEvent(){
  const c=devs.filter(d=>!d.done&&!d.fired&&!d.gatePending&&!d.bug&&d.frozen<=0);
  if(!c.length)return;
  const d=c[Math.random()*c.length|0];
  let r=Math.random()*EVENTS.reduce((a,e)=>a+e.w,0);
  for(const e of EVENTS){r-=e.w;if(r<=0){e.run(d);SFX.event();break;}}
}

/* ============ MODAIS ============ */
function enqueue(it){modalQueue.push(it);if(state==='play')openNext();}
function openNext(){
  while(modalQueue.length){
    const it=modalQueue.shift();
    if(it.dev.fired)continue;
    if(it.type==='c'&&!pending().length)continue;
    state='modal'; $('#modal').classList.remove('hidden');
    it.type==='q'?showQuestion(it.dev):showChoice(it.dev);
    return;
  }
  state='play';
}
function closeModal(){$('#modal').classList.add('hidden');modalHandler=null;openNext();}
function pickQ(ph){
  const pool=QUESTIONS[ph]; let free=pool.map((_,i)=>i).filter(i=>!usedQ[ph].has(i));
  if(!free.length){usedQ[ph].clear();free=pool.map((_,i)=>i);}
  const i=free[Math.random()*free.length|0]; usedQ[ph].add(i); return pool[i];
}
function showQuestion(d){
  const ph=d.gates, Q=pickQ(ph), order=shuffle(Q.o.map((_,i)=>i)), right=order.indexOf(0);
  const card=$('#modalCard');
  card.style.borderColor=PH_COL[ph];
  card.innerHTML=`<div class="q-head"><span class="chip" style="--c:${d.pal.hood}">${esc(d.name)}</span><span>${ph===4?'Checklist de deploy':'Revisão de fase'} · ${PHASES[ph].icon} ${PHASES[ph].name}</span></div>
  <h2>${esc(Q.q)}</h2>
  <div class="opts">${order.map((oi,k)=>`<button class="opt" data-k="${k}"><kbd>${k+1}</kbd><span>${esc(Q.o[oi])}</span></button>`).join('')}</div>
  <div class="explain hidden" id="exp"></div>
  <button class="cont hidden" id="contBtn" disabled>CONTINUAR ▶ (Enter)</button>`;
  const btns=[...card.querySelectorAll('.opt')], exp=card.querySelector('#exp'), cb=card.querySelector('#contBtn');
  let answered=false,canCont=false;
  function answer(k){
    if(answered||k<0||k>=btns.length)return; answered=true;
    const ok=k===right;
    btns.forEach((b,j)=>{b.disabled=true;if(j===right)b.classList.add('right');else if(j===k)b.classList.add('wrong');});
    const res=ok?(ph===4?'<b class="ok">✅ Deploy aprovado!</b>':'<b class="ok">✅ Revisão aprovada! +3% de progresso.</b>')
               :(ph===4?'<b class="no">❌ Deploy falhou — rollback para 94% e débito técnico +1.</b>':'<b class="no">❌ Passou com débito técnico: mais bugs e um pouco mais lento.</b>');
    exp.innerHTML=`${res}<br>${esc(Q.e)}`; exp.classList.remove('hidden'); cb.classList.remove('hidden');
    feed(`${ok?'✅':'❌'} ${esc(d.name)} ${ok?'acertou':'errou'} a revisão de ${PHASES[ph].name}.`,ok?'good':'warn');
    ok?SFX.ok():SFX.bad();
    resolveGate(d,ok);
    setTimeout(()=>{canCont=true;cb.disabled=false;},450);
  }
  function cont(){if(canCont)closeModal();}
  btns.forEach((b,k)=>b.onclick=()=>answer(k));
  cb.onclick=cont;
  modalHandler=k=>{if(/^[1-4]$/.test(k))answer(+k-1);else if(k==='enter'&&answered)cont();};
}
function showChoice(d){
  const t=mostBehind(d), b=bonusFor(d), card=$('#modalCard');
  card.style.borderColor='var(--good)';
  card.innerHTML=`<div class="q-head"><span class="chip" style="--c:${d.pal.hood}">${esc(d.name)}</span><span>Tarefa entregue · e agora?</span></div>
  <h2>🚀 Você entregou ${d.onTime?'no prazo':'com atraso'}!</h2>
  <p>${d.onTime?`Sobraram <b>${b.early.toFixed(1)} dias</b> até a deadline.`:'A deadline já passou, mas ainda dá pra salvar o time.'} <b>${esc(t.name)}</b> está com ${Math.floor(t.progress)}%${t.warnings?` e já tem ${t.warnings} aviso(s) de demissão`:''}.</p>
  <div class="opts">
    <button class="opt" data-k="0"><kbd>1</kbd><span><b>🤝 Fazer pair programming com ${esc(t.name)}</b><small>Sua tecla passa a programar (e depurar) na tarefa do colega com 70% de eficiência — entrar no contexto dele custa tempo (Lei de Brooks). Cada 1% que você fizer vale 20 pontos.</small></span></button>
    ${d.onTime?`<button class="opt" data-k="1"><kbd>2</kbd><span><b>💰 Pegar bônus de R$ ${b.r} e descansar</b><small>+${b.pts} pontos garantidos agora. Mas se alguém do time não entregar, ninguém ganha o bônus de equipe (+400 a +800 para cada um).</small></span></button>`
    :`<button class="opt" data-k="1"><kbd>2</kbd><span><b>🏠 Ir pra casa</b><small>Sem pontos extras. O time segue sem você.</small></span></button>`}
  </div>`;
  const pick=k=>{
    if(k===0){d.choice='help';retarget(d);feed(`🤝 ${esc(d.name)} foi fazer pair programming com ${esc(t.name)}.`,'good');SFX.ok();}
    else if(k===1){
      if(d.onTime){d.choice='bonus';d.bonus=b.pts;d.bonusR=b.r;feed(`💰 ${esc(d.name)} pegou o bônus de R$ ${b.r}.`,'warn');}
      else {d.choice='home';feed(`🏠 ${esc(d.name)} foi pra casa.`);}
    } else return;
    closeModal();
  };
  card.querySelectorAll('.opt').forEach(btn=>btn.onclick=()=>pick(+btn.dataset.k));
  modalHandler=k=>{if(k==='1')pick(0);else if(k==='2')pick(1);};
}

/* ============ FIM ============ */
function showEnd(){
  state='over';
  const allDel=devs.every(d=>d.done), allOn=allDel&&devs.every(d=>d.onTime);
  const fired=devs.filter(d=>d.fired), doneN=devs.filter(d=>d.done).length;
  const rows=devs.map(d=>{
    const p={entrega:d.done?1000:0,prazo:d.done&&d.onTime?300:0,bonus:d.bonus,equipe:Math.round(d.donated*20),rev:d.correct*100,avisos:-250*d.warnings,time:(allDel?400:0)+(allOn?400:0)};
    return {d,p,total:Object.values(p).reduce((a,b)=>a+b,0)};
  }).sort((a,b)=>b.total-a.total);
  let title,sub;
  if(allOn){title='🏆 SPRINT PERFEITA';sub='Tudo entregue dentro do prazo. Bônus de equipe completo para todo mundo.';}
  else if(allDel){title='😅 ENTREGUE COM ATRASO';sub='O sistema saiu completo, mas a deadline estourou.';}
  else if(doneN){title='💥 ENTREGA INCOMPLETA';sub=`${fired.map(d=>esc(d.name)).join(', ')} ${fired.length>1?'foram demitidos':'foi demitido'} — o sistema foi pro ar sem ${fired.length>1?'esses módulos':'esse módulo'}.`;}
  else {title='🔥 PROJETO CANCELADO';sub='Ninguém entregou. O cliente rescindiu o contrato.';}
  const best=devs.filter(d=>d.donated>0.5).sort((a,b)=>b.donated-a.donated)[0];
  const totDon=devs.reduce((a,d)=>a+d.donated,0), totC=devs.reduce((a,d)=>a+d.correct,0), totW=devs.reduce((a,d)=>a+d.wrong,0);
  const L=[];
  L.push(['📉 Burndown','A linha laranja era o ritmo ideal da sprint. Quem ficou atrás dela cedo dificilmente recuperou sozinho — acompanhar o burndown serve justamente para pedir ajuda antes da deadline.']);
  if(totDon>0)L.push(['🤝 Pair programming × Lei de Brooks',`${Math.round(totDon/(devs.length*100)*100)}% de todo o trabalho do time veio de quem já tinha entregado e foi ajudar. A ajuda rendia só 70% (custo de entrar no contexto), mas mesmo assim fez diferença.`]);
  const takers=devs.filter(d=>d.choice==='bonus');
  if(takers.length&&fired.length)L.push(['⚖️ Incentivo individual × resultado do time',`${takers.map(d=>esc(d.name)).join(', ')} pegou bônus enquanto ${fired.map(d=>esc(d.name)).join(', ')} acabou demitido. Com o projeto incompleto, o bônus de equipe sumiu para todo mundo.`]);
  else if(takers.length&&allDel)L.push(['💰 Folga no cronograma','Deu para pegar bônus e ainda entregar tudo: quando a estimativa tem folga, o time pode se dar esse luxo.']);
  if(totW)L.push(['🧾 Débito técnico',`${totW} revisão(ões) errada(s) viraram débito técnico: cada uma deixou o código ~7% mais lento de mexer e com mais bugs. Pular qualidade agora cobra juros depois.`]);
  if(scopeCount)L.push(['🔄 Scope creep',`O requisito mudou ${scopeCount}x no meio da sprint. Por isso o Scrum protege a sprint: mudanças novas entram pelo backlog, não no meio do trabalho.`]);
  if(devs.some(d=>d.warnings>0))L.push(['🔥 Crunch','Cada aviso de demissão deixava o dev 18% mais lento e com mais bugs. Pressão sem apoio piora exatamente o problema que tenta resolver.']);
  L.push(['📚 Revisões',`O time acertou ${totC} de ${totC+totW} perguntas de revisão${totC+totW?` (${Math.round(totC/(totC+totW)*100)}%)`:''}.`]);
  const st=d=>d.fired?'📦 Demitido':d.done?(d.onTime?`✅ No prazo · dia ${(d.finishTime/DAY_MS).toFixed(1)}`:`⏰ Atrasado · dia ${(d.finishTime/DAY_MS).toFixed(1)}`):'—';
  $('#endCard').innerHTML=`<h1>${title}</h1><p class="tagline">${sub}${best?` 🏅 Melhor colega: <b>${esc(best.name)}</b> (${Math.round(best.donated)}% feito em par).`:''}</p>
  <div class="tableWrap"><table><thead><tr><th>#</th><th>DEV</th><th>STATUS</th><th>REVISÕES</th><th>AJUDA</th><th>BÔNUS</th><th>AVISOS</th><th>PONTOS</th></tr></thead><tbody>
  ${rows.map((r,i)=>`<tr><td>${i+1}</td><td><span class="chip" style="--c:${r.d.pal.hood}">${esc(r.d.name)}</span>${r.d.human?'':' 🤖'}</td><td>${st(r.d)}</td><td>${r.d.correct}/${r.d.correct+r.d.wrong}</td><td>${r.d.donated>0.5?Math.round(r.d.donated)+'%':'—'}</td><td>${r.d.bonusR?'R$ '+r.d.bonusR:'—'}</td><td>${'📄'.repeat(r.d.warnings)||'—'}</td><td class="pts" title="entrega ${r.p.entrega} · prazo ${r.p.prazo} · bônus ${r.p.bonus} · ajuda ${r.p.equipe} · revisões ${r.p.rev} · avisos ${r.p.avisos} · equipe ${r.p.time}">${r.total}</td></tr>`).join('')}
  </tbody></table></div>
  <h3 style="font-family:'Press Start 2P';font-size:10px;color:var(--accent);margin:4px 0 10px">O QUE ESSA SPRINT ENSINOU</h3>
  <div class="lessons">${L.map(l=>`<div class="lesson"><b>${l[0]}</b>${l[1]}</div>`).join('')}</div>
  <p class="concepts">Pontuação: entrega 1000 · no prazo +300 · revisão certa +100 · 1% ajudado +20 · bônus 200/dia de folga · aviso −250 · time todo entregou +400 (e no prazo +400).</p>
  <div class="row"><button class="start" id="againBtn">↻ REVANCHE</button><button class="start ghost" id="setupBtn">⚙ MUDAR TIME</button></div>`;
  $('#end').classList.remove('hidden');
  $('#againBtn').onclick=startGame;
  $('#setupBtn').onclick=()=>{$('#end').classList.add('hidden');state='setup';renderSetup();$('#setup').classList.remove('hidden');};
}

/* ============ UPDATE ============ */
function update(dt){
  animTime+=dt;
  for(const d of devs)d.disp+=(d.progress-d.disp)*Math.min(1,dt*12);
  for(const p of particles){p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.grav)p.vy+=p.grav*dt;p.life-=dt;}
  particles=particles.filter(p=>p.life>0);
  if(state!=='play')return;
  gameTime+=dt*1000;
  while(nextWarn<3&&gameTime>=(D+nextWarn)*DAY_MS){issueWarnings(nextWarn);nextWarn++;}
  for(const d of devs){
    if(d.frozen>0)d.frozen-=dt; if(d.coffee>0)d.coffee-=dt;
    if(d.gatePending&&!d.human&&!d.fired){d.gateTimer-=dt;if(d.gateTimer<=0)resolveBotGate(d);}
  }
  for(const d of devs){
    if(d.human||d.fired)continue;
    if(d.done&&d.helping==null)continue;
    d.botTimer-=dt;
    if(d.botTimer<=0){d.botTimer=1/(d.botRate*(.75+Math.random()*.5));press(d.idx,false);}
    if(state!=='play')return;
  }
  eventTimer-=dt; if(eventTimer<=0){randomEvent();eventTimer=6+Math.random()*5;}
  if(!ending&&devs.length&&devs.every(d=>d.done||d.fired)){ending=true;state='ending';setTimeout(showEnd,1800);}
}

/* ============ RENDER ============ */
function bubble(c,x,y,txt,col='#ebe8e2'){
  c.font="600 11px 'JetBrains Mono'"; c.textAlign='left'; c.textBaseline='middle';
  const w=c.measureText(txt).width+12, bx=Math.round(Math.min(W-w-4,Math.max(X0-30,x-w/2)));
  c.fillStyle='#1f232d';c.fillRect(bx,y,w,19);c.strokeStyle=col;c.lineWidth=2;c.strokeRect(bx+1,y+1,w-2,17);
  c.fillStyle=col;c.fillText(txt,bx+6,y+10.5);
}
function render(){
  const c=g; c.textBaseline='alphabetic';
  c.fillStyle='#101217';c.fillRect(0,0,W,H);
  const cw=(X1-X0)/5;
  // colunas de fase
  for(let i=0;i<5;i++){
    const x=X0+i*cw-(i===0?24:0), w=cw+(i===0?24:0);
    c.fillStyle=i%2?'#151820':'#12141a';c.fillRect(x,0,w,H);
    c.fillStyle=PH_COL[i];c.fillRect(X0+i*cw+4,14,cw-8,4);
    c.textAlign='center';c.font="8px 'Press Start 2P'";c.fillText(`FASE ${i+1}`,X0+i*cw+cw/2,36);
    c.font="700 12px 'JetBrains Mono'";c.fillStyle='#ebe8e2';c.fillText(`${PHASES[i].icon} ${PHASES[i].name}`,X0+i*cw+cw/2,56);
    c.font="11px 'JetBrains Mono'";c.fillStyle='#7d828d';c.fillText(PHASES[i].desc,X0+i*cw+cw/2,72);
  }
  // painel esquerdo
  c.fillStyle='#0d0f13';c.fillRect(0,0,X0-28,H);
  c.textAlign='left';c.font="9px 'Press Start 2P'";c.fillStyle='#D97757';c.fillText('TIME',14,36);
  c.font="11px 'JetBrains Mono'";c.fillStyle='#7d828d';c.fillText(devs.length?`${devs.filter(d=>d.done).length}/${devs.length} entregues`:'',14,56);
  // chegada
  for(let y=TOP;y<H-10;y+=8){c.fillStyle=((y/8)|0)%2?'#ebe8e2':'#2a2f3a';c.fillRect(X1+30,y,6,8);c.fillStyle=((y/8)|0)%2?'#2a2f3a':'#ebe8e2';c.fillRect(X1+36,y,6,8);}
  c.textAlign='center';c.font="12px 'JetBrains Mono'";c.fillText('🏁',X1+36,TOP-6);
  const n=devs.length;
  // raias
  for(let i=0;i<n;i++){
    const d=devs[i],ly=laneY(i);
    c.fillStyle='#232733';c.fillRect(0,ly,W,2);
    for(let k=1;k<=4;k++){const gx=X0+k*cw, gy=ly+laneH-14;
      c.fillStyle=d.gates>=k?PH_COL[k-1]:'#2c313d';c.beginPath();c.moveTo(gx,gy-6);c.lineTo(gx+6,gy);c.lineTo(gx,gy+6);c.lineTo(gx-6,gy);c.fill();}
    c.fillStyle='#1b1f28';c.fillRect(X0-24,ly+laneH-9,X1-X0+60,3);
    // rótulos
    c.textAlign='left';c.fillStyle=d.pal.hood;c.fillRect(14,ly+14,10,10);
    c.font="9px 'Press Start 2P'";c.fillStyle=d.fired?'#6b707b':'#ebe8e2';c.fillText(d.name.slice(0,10),30,ly+24);
    c.font="600 11px 'JetBrains Mono'";c.fillStyle='#8f949e';
    c.fillText(d.human?`tecla [${d.key.toUpperCase()}]`:'CPU 🤖',14,ly+44);
    const phName=d.fired?'demitido':d.done?(d.onTime?'entregue ✔':'entregue (atraso)'):PHASES[Math.min(4,d.gates)].name;
    c.fillStyle=d.done?'#5fd38d':d.fired?'#ef5b5b':'#ebe8e2';c.fillText(`${Math.floor(d.progress)}% · ${phName}`,14,ly+62);
    for(let k=0;k<3;k++){const wx=14+k*16,wy=ly+72;
      if(k<d.warnings){c.fillStyle='#ef5b5b';c.fillRect(wx,wy,11,14);c.fillStyle='#2a1215';c.fillRect(wx+2,wy+4,7,1);c.fillRect(wx+2,wy+7,7,1);c.fillRect(wx+2,wy+10,5,1);}
      else {c.strokeStyle='#343a46';c.lineWidth=2;c.strokeRect(wx+1,wy+1,9,12);}}
    if(d.debt){c.fillStyle='#f2c14e';c.font="600 11px 'JetBrains Mono'";c.fillText(`⚠ débito ${d.debt}`,66,ly+83);}
  }
  // linha de ritmo ideal / deadline
  if(state!=='setup'&&n){
    const over=gameTime>=D*DAY_MS, ix=over?X1:X0+idealP()/100*(X1-X0);
    c.strokeStyle=over?'#ef5b5b':'#D97757';c.lineWidth=2;c.setLineDash(over?[]:[6,6]);c.lineDashOffset=-animTime*20;
    c.beginPath();c.moveTo(ix,TOP);c.lineTo(ix,H-10);c.stroke();c.setLineDash([]);
    c.font="7px 'Press Start 2P'";c.textAlign='center';const lbl=over?'DEADLINE ESTOURADA':'RITMO IDEAL';
    const tw=c.measureText(lbl).width+10, lx=Math.min(W-tw/2-4,ix);
    c.fillStyle=over?'#ef5b5b':'#D97757';c.fillRect(lx-tw/2,TOP-16,tw,14);c.fillStyle='#14100e';c.fillText(lbl,lx,TOP-6);
  }
  // links de pair programming
  for(const h of devs){
    if(!h.done||h.helping==null)continue;const t=devs[h.helping];if(!t||t.done||t.fired)continue;
    const ax=devX(h),ay=laneY(h.idx)+laneH-45,bx=devX(t)+10,by=laneY(t.idx)+laneH-45;
    c.strokeStyle=h.pal.hood;c.globalAlpha=.75;c.lineWidth=2;c.setLineDash([4,6]);c.lineDashOffset=-animTime*40;
    c.beginPath();c.moveTo(ax,ay);c.quadraticCurveTo((ax+bx)/2,Math.min(ay,by)-40,bx,by);c.stroke();c.setLineDash([]);c.globalAlpha=1;
  }
  // devs
  for(const d of devs){
    const ly=laneY(d.idx), oy0=ly+laneH-12-14*PX;
    let x=devX(d), bob=0, leg=0;
    const typing=animTime-d.lastWork<.22;
    if(typing){leg=Math.floor(animTime*12)%2;bob=leg?-PX:0;}
    else bob=Math.round(Math.sin(animTime*3+d.idx)*1);
    if(d.done&&animTime-d.doneT<2.2)bob=-Math.round(Math.abs(Math.sin((animTime-d.doneT)*7))*14);
    let gray=false,box=false;
    if(d.fired){gray=true;box=true;const t=animTime-d.firedT;x-=Math.min(70,t*22);leg=t<3.2?Math.floor(animTime*6)%2:0;bob=0;}
    const behind=!d.done&&!d.fired&&d.progress<idealP()-8;
    const mood=d.done?'happy':(d.warnings||behind||d.bug)?'worried':'normal';
    const blink=((animTime*1000+d.idx*733)%3200)<130;
    // chefe
    if(d.warnings&&!d.done&&!d.fired){
      const bxp=Math.max(X0-30,x-80)+(Math.random()<.15?1:0);
      drawMap(c,BOSS,bxp-24,oy0+bob*0,{s:'#e9b994',g:'#9aa0a6',K:'#3a2a20',k:'#15161a',m:'#7a2e2e',u:'#2b2f3a',w:'#f1f1f1',t:'#e04848',p:'#22252e',b:'#0c0c10'},PX);
      bubble(c,bxp,oy0-24,BOSS_LINES[Math.floor(animTime/2.2+d.idx)%BOSS_LINES.length],'#ef5b5b');
    }
    drawDevSprite(c,d.slot,x-24,oy0+bob,{mood,blink,leg,typing:typing||(d.done&&d.helping!=null&&typing),flick:Math.floor(animTime*16)%2,gray,box,sweat:(behind||d.warnings>0)&&!d.done&&!d.fired,t:animTime});
    if(d.coffee>0&&!d.done){c.font="14px sans-serif";c.textAlign='center';c.fillText('☕',x+26,oy0+20);}
    // bug
    if(d.bug){
      const wig=Math.sin(animTime*30)*2, hit=animTime-d.bug.hit<.1?3:0;
      drawMap(c,BUG,x+28+wig+hit,oy0+26,{g:'#6fdc6f',k:'#1b4d1b',a:'#6fdc6f'},3);
      c.fillStyle='#2a2f3a';c.fillRect(x+26,oy0+48,28,4);c.fillStyle='#6fdc6f';c.fillRect(x+26,oy0+48,28*d.bug.hp/d.bug.max,4);
    }
    // balão de status
    let b=null,bc='#ebe8e2';
    if(d.fired){b='📦 demitido';bc='#ef5b5b';}
    else if(d.done){ if(d.helping!=null&&devs[d.helping]){b=`🤝 par c/ ${devs[d.helping].name}`;bc=d.pal.hood;} else if(d.choice==='bonus'){b=`🏖️ bônus R$${d.bonusR}`;bc='#f2c14e';} else if(d.choice==='home'){b='🏠 foi pra casa';} else {b='✔ entregue';bc='#5fd38d';} }
    else if(d.gatePending){b=d.gates===4?'🚀 checklist de deploy…':'📝 em revisão…';bc=PH_COL[d.gates];}
    else if(d.bug){b=`🐛 debug ${d.bug.max-d.bug.hp}/${d.bug.max}`;bc='#6fdc6f';}
    else if(d.frozen>0){b='📞 em reunião';bc='#f2c14e';}
    if(b)bubble(c,x,oy0-26+(d.done&&animTime-d.doneT<2.2?bob:0),b,bc);
    if(d.fired){c.save();c.translate((X0+X1)/2,ly+laneH/2+4);c.rotate(-.08);c.globalAlpha=.85;c.strokeStyle='#ef5b5b';c.lineWidth=3;c.strokeRect(-92,-18,184,36);c.fillStyle='#ef5b5b';c.font="14px 'Press Start 2P'";c.textAlign='center';c.textBaseline='middle';c.fillText('DEMITIDO',0,1);c.restore();c.textBaseline='alphabetic';}
  }
  // partículas
  for(const p of particles){c.globalAlpha=Math.max(0,p.life/p.max);
    if(p.txt){c.font="700 11px 'JetBrains Mono'";c.textAlign='center';c.fillStyle=p.col;c.fillText(p.txt,p.x,p.y);}
    else {c.fillStyle=p.col;c.fillRect(p.x,p.y,p.sq,p.sq);}}
  c.globalAlpha=1;
  if(state==='paused'){c.fillStyle='rgba(8,9,12,.75)';c.fillRect(0,0,W,H);c.fillStyle='#ebe8e2';c.textAlign='center';c.font="20px 'Press Start 2P'";c.fillText('PAUSADO',W/2,H/2);c.font="12px 'JetBrains Mono'";c.fillStyle='#9a9ea8';c.fillText('Esc ou ⏸ para continuar',W/2,H/2+28);}
  updateHud();
}
function updateHud(){
  const day=dayNow(), over=gameTime>=D*DAY_MS, el=$('#dayLabel');
  const left=over?`HORA EXTRA +${Math.floor(day-D)+1}`:`DIA ${Math.min(D,Math.floor(day)+1)} / ${D}`;
  const right=over?'⚠ deadline estourada':`faltam ${Math.max(0,D-day).toFixed(1)} dias`;
  const html=`<span>${left}</span><span>${right}</span>`; if(el.innerHTML!==html)el.innerHTML=html;
  el.classList.toggle('over',over);
  const span=D+2; $('#timeFill').style.width=Math.min(100,day/span*100)+'%'; $('#dlMark').style.left=(D/span*100)+'%';
  $('#pauseBtn').textContent=state==='paused'?'▶':'⏸';
  for(const pad of document.querySelectorAll('.pad')){
    const d=devs[+pad.dataset.i]; if(!d)continue;
    let a,off=false;
    if(d.fired){a='📦 DEMITIDO';off=true;}
    else if(d.done){ if(d.helping!=null&&devs[d.helping])a=`🤝 AJUDAR ${devs[d.helping].name.toUpperCase()}`; else {a=d.choice==='bonus'?'🏖️ DE FOLGA':'✅ ENTREGUE';off=true;} }
    else if(d.gatePending)a='📝 REVISÃO';
    else if(d.bug)a='🐛 DEBUGAR!';
    else if(d.frozen>0){a='📞 REUNIÃO';off=true;}
    else a='⌨️ PROGRAMAR';
    const ae=pad.querySelector('.act'); if(ae.textContent!==a)ae.textContent=a;
    pad.classList.toggle('off',off);
  }
}

/* ============ PADS / ENTRADA ============ */
function buildPads(){
  const el=$('#pads'); el.innerHTML='';
  const hs=devs.filter(d=>d.human);
  if(!hs.length){el.innerHTML='<div class="demo">🤖 Modo demonstração: só CPUs na sprint. Ótimo para mostrar a dinâmica para a turma.</div>';return;}
  hs.forEach(d=>{
    const b=document.createElement('button');b.className='pad';b.dataset.i=d.idx;b.style.setProperty('--c',d.pal.hood);
    b.innerHTML=`<span class="who"><kbd>${d.key.toUpperCase()}</kbd> ${esc(d.name)}</span><span class="act">⌨️ PROGRAMAR</span>`;
    b.addEventListener('pointerdown',e=>{e.preventDefault();press(d.idx,true);});
    el.appendChild(b);
  });
}
function flashPad(i){const p=document.querySelector(`.pad[data-i="${i}"]`);if(p){p.classList.add('hit');setTimeout(()=>p.classList.remove('hit'),70);}}
function togglePause(){if(state==='play')state='paused';else if(state==='paused')state='play';}
addEventListener('keydown',e=>{
  if(e.target.tagName==='INPUT')return;
  const k=e.key.toLowerCase();
  if(state==='modal'){if(!e.repeat&&modalHandler){if(k==='enter'||/^[1-4]$/.test(k))e.preventDefault();modalHandler(k);}return;}
  if(k==='escape'){togglePause();return;}
  if(e.repeat)return;
  const d=devs.find(d=>d.human&&d.key===k);
  if(d&&(state==='play')){e.preventDefault();press(d.idx,true);flashPad(d.idx);}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&state==='play')state='paused';});
$('#pauseBtn').onclick=togglePause;
$('#soundBtn').onclick=()=>{muted=!muted;$('#soundBtn').textContent=muted?'🔇':'🔊';};

/* ============ SETUP ============ */
function renderSetup(){
  const el=$('#slots'); el.innerHTML='';
  cfg.slots.forEach((s,i)=>{
    const r=document.createElement('div');r.className='slot'+(s.on?'':' off');r.style.setProperty('--c',PALETTES[i].hood);
    r.innerHTML=`<input type="checkbox" ${s.on?'checked':''} title="Participa da sprint"><span class="sw"></span>
      <input class="nm" maxlength="10" value="${esc(s.name)}">
      <div class="seg"><button data-h="1" class="${s.human?'on':''}">Humano</button><button data-h="0" class="${s.human?'':'on'}">CPU</button></div>
      <kbd title="Tecla do jogador">${KEYS[i].toUpperCase()}</kbd>`;
    r.querySelector('input[type=checkbox]').onchange=e=>{s.on=e.target.checked;r.classList.toggle('off',!s.on);};
    r.querySelector('.nm').oninput=e=>{s.name=e.target.value;};
    r.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{s.human=b.dataset.h==='1';r.querySelectorAll('.seg button').forEach(x=>x.classList.toggle('on',x===b));});
    el.appendChild(r);
  });
  document.querySelectorAll('#diff button').forEach(b=>{b.classList.toggle('on',+b.dataset.d===cfg.days);b.onclick=()=>{cfg.days=+b.dataset.d;document.querySelectorAll('#diff button').forEach(x=>x.classList.toggle('on',x===b));};});
}
$('#startBtn').onclick=()=>{
  if(cfg.slots.filter(s=>s.on).length<2){toast('Escolha pelo menos 2 devs','bad',1800);return;}
  if(!actx){try{actx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}}
  else if(actx.state==='suspended')actx.resume();
  startGame();
};
function renderPreview(){
  const c=pg; c.fillStyle='#12141a';c.fillRect(0,0,640,110);
  c.fillStyle='#1b1f28';c.fillRect(0,96,640,3);
  cfg.slots.forEach((s,i)=>{
    const x=60+i*150, t=animTime+i*.4, typing=Math.sin(t*2)>-.2, leg=typing?Math.floor(animTime*10+i)%2:0;
    const bob=typing?(leg?-PX:0):0;
    drawDevSprite(c,i,x,30+bob,{mood:i===2?'worried':'happy',blink:((animTime*1000+i*733)%3000)<130,leg,typing,flick:Math.floor(animTime*16)%2,gray:!s.on,sweat:i===2,t:animTime});
    c.globalAlpha=s.on?1:.4;c.font="8px 'Press Start 2P'";c.fillStyle=PALETTES[i].hood;c.textAlign='left';c.fillText((s.name||'').slice(0,10),x+56,58);
    c.font="11px 'JetBrains Mono'";c.fillStyle='#8f949e';c.fillText(s.human?`[${KEYS[i].toUpperCase()}]`:'CPU',x+56,76);c.globalAlpha=1;
  });
}

/* ============ LOOP ============ */
let last=performance.now();
function loop(now){
  const dt=Math.min(.05,(now-last)/1000); last=now;
  update(dt); render();
  if(state==='setup'||!$('#setup').classList.contains('hidden'))renderPreview();
  requestAnimationFrame(loop);
}
renderSetup();
requestAnimationFrame(loop);

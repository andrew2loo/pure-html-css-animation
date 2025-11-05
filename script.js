(function(){
  const grid = document.getElementById('productGrid');
  const wrapper = document.getElementById('gridWrapper');
  const svg = document.getElementById('connectionsSvg');

  if(!grid || !wrapper || !svg) return;

  const cards = Array.from(grid.querySelectorAll('.card'));

  // Connection order per README
  // Using 0-based indices corresponding to data-index on each card
  const connections = [
    [0, 4], // Accounting → e-Invoicing
    [0, 1], // Accounting → POS
    [1, 6], // POS → Inventory & Warehouse
    [2, 8], // Cloud Accounting → Analytics
    [3, 8], // Payroll → Analytics
    [5, 6], // eCommerce → Inventory & Warehouse
    [7, 0], // Mobile Sales → Accounting
    [0, 8]  // Accounting → Analytics
  ];

  // Cycle flow colors A/B/C
  const flowClass = (i)=> ['flow-a','flow-b','flow-c'][i % 3];

  // Install IntersectionObserver to add in-view class to grid
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        // sequence icons/lines together
        runSequenceOnce();
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  io.observe(grid);

  let ran = false;
  function runSequenceOnce(){
    if(ran) return; ran = true;
    const lineDuration = parseTime(getComputedStyle(document.documentElement).getPropertyValue('--line-duration')) || 1000;
    // Sync icon fade duration to line duration
    document.documentElement.style.setProperty('--fade-duration', `${lineDuration}ms`);

    drawConnectionsSequentially();
    // Also redraw on resize to keep coordinates accurate
    window.addEventListener('resize', debounce(()=>{
      resetConnections();
      drawConnectionsSequentially();
    }, 150));
  }

  function parseTime(val){
    if(!val) return 0;
    const v = String(val).trim();
    if(v.endsWith('ms')) return parseFloat(v);
    if(v.endsWith('s')) return parseFloat(v) * 1000;
    const n = parseFloat(v); return isNaN(n) ? 0 : n;
  }

  function debounce(fn, wait){
    let t; return function(){ clearTimeout(t); t = setTimeout(fn, wait); };
  }

  function centerOf(el){
    const cardRect = el.getBoundingClientRect();
    const wrapRect = wrapper.getBoundingClientRect();
    const x = cardRect.left - wrapRect.left + (cardRect.width / 2);
    const y = cardRect.top - wrapRect.top + (cardRect.height / 2);
    return { x, y };
  }

  function makePath(from, to){
    // Orthogonal (Manhattan) path: horizontal/vertical segments only
    const dx = Math.abs(to.x - from.x);
    const dy = Math.abs(to.y - from.y);

    // If aligned closely in X or Y, draw a straight line
    if (dx < 1) return `M ${from.x},${from.y} L ${to.x},${to.y}`; // vertical
    if (dy < 1) return `M ${from.x},${from.y} L ${to.x},${to.y}`; // horizontal

    // Use a 3-segment elbow: go halfway on X, then turn to Y, then to target X
    const midX = (from.x + to.x) / 2;
    return `M ${from.x},${from.y} L ${midX},${from.y} L ${midX},${to.y} L ${to.x},${to.y}`;
  }

  function clearSvg(){
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    // ensure viewBox and size match wrapper
    const { width, height } = wrapper.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${Math.max(1,width)} ${Math.max(1,height)}`);
    svg.setAttribute('preserveAspectRatio', 'none');
  }

  function resetConnections(){
    clearSvg();
  }

  function revealCard(index){
    const card = cards[index];
    if(!card || card.classList.contains('reveal')) return Promise.resolve();
    card.classList.add('reveal');
    const fadeDuration = parseTime(getComputedStyle(document.documentElement).getPropertyValue('--fade-duration')) || 1000;
    return new Promise(resolve=> setTimeout(resolve, fadeDuration * 0.6));
  }

  function drawConnectionsSequentially(){
    clearSvg();

    const lineDuration = parseTime(getComputedStyle(document.documentElement).getPropertyValue('--line-duration')) || 1000;
    const lineGap = parseTime(getComputedStyle(document.documentElement).getPropertyValue('--line-gap')) || 140;

    // Chain promises to serialize reveal+line for each connection
    let sequence = Promise.resolve();
    connections.forEach((pair, i)=>{
      const [fromIdx, toIdx] = pair;
      sequence = sequence.then(()=> Promise.all([revealCard(fromIdx), revealCard(toIdx)])).then(()=>{
        const p = document.createElementNS('http://www.w3.org/2000/svg','path');
        const from = centerOf(cards[fromIdx]);
        const to = centerOf(cards[toIdx]);
        p.setAttribute('d', makePath(from, to));
        p.setAttribute('class', `animate hidden ${flowClass(i)}`);
        svg.appendChild(p);

        const length = p.getTotalLength();
        p.style.strokeDasharray = `${length}`;
        p.style.strokeDashoffset = `${length}`;

        return new Promise(resolve=>{
          p.classList.remove('hidden');
          p.classList.add('visible');
          p.style.transition = `stroke-dashoffset ${lineDuration}ms ease, opacity 240ms ease`;
          requestAnimationFrame(()=>{ p.style.strokeDashoffset = '0'; });
          setTimeout(resolve, lineDuration + lineGap);
        });
      });
    });

    // After all connections, reveal any remaining cards (if any were never connected)
    sequence.then(()=>{
      cards.forEach((card)=>{ if(!card.classList.contains('reveal')) card.classList.add('reveal'); });
    });
  }
})();



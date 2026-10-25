import { composeCommand } from './commands.js';

const $ = (selector) => document.querySelector(selector);
const crew = $('#crew');
let installPrompt;
let lastFocus;
function showDialog(id) {
  lastFocus = document.activeElement;
  $(id).showModal();
}
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => lastFocus?.focus());
});
function message(text) { $('#app-message').textContent = text; }

// Boiler Bot V2 geometry, adapted from 0xSneaks/the-boiler-room's avatar SVG.
// Bright palette and props are decoration; they never represent live agent activity.
function botSVG(color, pose) {
  const props = [
    '<g class="prop"><path d="M22 18h3v3h-3z" fill="#ffb564"/><path d="M25 18.5q2 0 0 2" fill="none" stroke="#a5714e" stroke-width=".5"/></g>',
    '<g class="prop"><path d="M22 14l5 2-4 2 1-2z" fill="#fff" stroke="#9eb0bf" stroke-width=".3"/></g>',
    '<g class="prop"><circle cx="25" cy="15" r="1.5" fill="#ff8d97"/><circle cx="23" cy="11" r="1.1" fill="#d3b3f4"/></g>',
    '<g class="prop"><path d="M22 19q3-4 5 0v2h-5z" fill="#f9db83"/><path d="M23 18v-2m2 2v-2" stroke="#dd9f70" stroke-width=".5"/></g>'
  ][pose % 4];
  return `<svg viewBox="-3 0 33 30" aria-hidden="true" focusable="false">
    <g class="robot">
      <g class="bot-antenna"><path d="M12 4.4V2.8" stroke="#455c68" stroke-width="1.1" stroke-linecap="round"/><circle cx="12" cy="2.2" r="1.1" fill="#ffcf62"/></g>
      <rect x="4.6" y="4.5" width="14.8" height="15.5" rx="7.4" fill="${color}"/>
      <path d="M6.2 7.4Q7.2 6.3 8.7 6.3" stroke="white" stroke-width=".8" fill="none" opacity=".5" stroke-linecap="round"/>
      <g class="bot-arm"><path d="M5 12.2L3.1 12.7" stroke="${color}" stroke-width="2.3" stroke-linecap="round"/><circle cx="2.7" cy="12.9" r="1.2" fill="${color}"/></g>
      <g class="bot-arm"><path d="M19 12.2L20.9 12.7" stroke="${color}" stroke-width="2.3" stroke-linecap="round"/><circle cx="21.3" cy="12.9" r="1.2" fill="${color}"/></g>
      <path d="M9.6 20v1.2m4.8-1.2v1.2M8.4 21.6h2.4m2.4 0h2.4" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>
      <rect x="6.6" y="6.4" width="10.8" height="5.4" rx="2.7" fill="#293b46"/>
      <g class="bot-eyes" fill="#e5ffed"><rect x="7.8" y="8.2" width="3.6" height="1.6" rx=".8"/><rect x="12.6" y="8.2" width="3.6" height="1.6" rx=".8"/></g>
      <path d="M9.8 11h4.4" stroke="#e5ffed" stroke-width=".6" stroke-linecap="round"/>
      <path d="M7.2 13.3v1m0 .7v1m0 .7v1" stroke="#405760" stroke-width=".6" stroke-linecap="round"/>
      <circle cx="12" cy="15.3" r="1.9" fill="#f4fff5" stroke="#5d7c79" stroke-width=".6"/><path d="M12 15.3l.9-1" stroke="#5671a8" stroke-width=".7" stroke-linecap="round"/>
    </g>${props}
    <rect class="desk" x="3" y="24" width="19" height="2" rx=".8"/><path d="M5 26v3m15-3v3" stroke="#9ab1a6" stroke-width=".8"/>
    <rect class="desk-screen" x="8" y="19.5" width="8" height="4.5" rx=".6"/><path class="desk-line" d="M9.5 21h3m-3 1.2h5"/>
  </svg>`;
}

const palette = ['#f0a07c', '#ffb8a7', '#c5a1e0', '#88b8ef', '#f3d36a', '#74c9ab', '#a7b9ef', '#ea97c2', '#7dd6d0'];
async function loadCrew() {
  try {
    const response = await fetch('./crew.json');
    if (!response.ok) throw new Error('Roster unavailable');
    const data = await response.json();
    if (!Array.isArray(data.agents) || !data.agents.length) throw new Error('Roster is empty');
    const fragment = document.createDocumentFragment();
    data.agents.forEach((agent, index) => {
      const button = document.createElement('button');
      button.className = 'crew-member';
      button.style.setProperty('--delay', `${-index * .49}s`);
      button.dataset.agent = agent.id;
      button.setAttribute('aria-label', `${agent.name}, activity unknown. View crew details`);
      // Only fixed SVG geometry and developer-owned palette enter innerHTML.
      button.innerHTML = botSVG(palette[index % palette.length], index);
      const name = document.createElement('span'); name.className = 'crew-name'; name.textContent = agent.name;
      const detail = document.createElement('span'); detail.className = 'crew-detail'; detail.textContent = agent.subtitle || 'Crew member';
      button.append(name, detail);
      button.addEventListener('click', () => {
        $('#crew-title').textContent = agent.name;
        $('#crew-role').textContent = agent.role;
        $('#crew-status').textContent = 'Activity: unknown. This room keeps every crew member visible, whether working or idle. The animation is for fun.';
        $('#crew-source').textContent = `Listed in ${agent.sources.join(' and ')}. Roster snapshot: ${new Date(data.syncedAt).toLocaleString()}.`;
        showDialog('#crew-dialog');
      });
      fragment.append(button);
    });
    crew.replaceChildren(fragment);
    $('#crew-count').textContent = `${data.agents.length} crew · everyone's here`;
    $('#roster-date').textContent = `Roster: ${new Date(data.syncedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
  } catch (error) {
    $('#crew-count').textContent = 'Roster unavailable';
    message('Could not load the crew. Reconnect and reload.');
  }
}

document.querySelectorAll('[data-command]').forEach((button) => {
  button.addEventListener('click', () => {
    try {
      $('#command-output').value = composeCommand(button.dataset.command, $('#command-input').value);
      $('#command-title').textContent = {check:'CHECK COMS',react:'REACT',review:'REVIEW AND BREAK DOWN'}[button.dataset.command];
      $('#copy-status').textContent = '';
      message('');
      showDialog('#command-dialog');
    } catch (error) { message(error.message); $('#command-input').focus(); }
  });
});
$('#copy-command').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText($('#command-output').value);
    $('#copy-status').textContent = 'Copied. Paste it into your agent. Nothing has been sent automatically.';
  } catch {
    $('#command-output').focus(); $('#command-output').select();
    $('#copy-status').textContent = 'Copy permission is unavailable. The command is selected; use Copy.';
  }
});

let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
function motionState() {
  document.body.classList.toggle('motion-paused', paused);
  $('#motion-toggle').setAttribute('aria-pressed', String(paused));
  $('#motion-toggle').textContent = paused ? 'Resume motion' : 'Pause motion';
}
$('#motion-toggle').addEventListener('click', () => { paused = !paused; motionState(); });
motionState();

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); installPrompt = event; $('#native-install').hidden = false;
});
$('#install-help').addEventListener('click', () => showDialog('#install-dialog'));
$('#native-install').addEventListener('click', async () => {
  if (!installPrompt) return;
  await installPrompt.prompt();
  const choice = await installPrompt.userChoice;
  $('#install-state').textContent = choice.outcome === 'accepted' ? 'Installation accepted.' : 'You can install whenever you like.';
  installPrompt = undefined; $('#native-install').hidden = true;
});
window.addEventListener('appinstalled', () => { $('#install-help').hidden = true; });
if (matchMedia('(display-mode: standalone)').matches || navigator.standalone) $('#install-help').hidden = true;
function connectivity() {
  $('#connection-state').textContent = navigator.onLine ? 'Local command console' : 'Offline · room available';
  $('#offline-note').textContent = navigator.onLine ? '' : 'GitHub needs a connection.';
}
window.addEventListener('online', connectivity); window.addEventListener('offline', connectivity); connectivity();
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {
    $('#offline-note').textContent = 'Offline saving unavailable. You can still use the console online.';
  });
} else {
  $('#offline-note').textContent = 'Offline saving is unavailable in this browser.';
}
loadCrew();

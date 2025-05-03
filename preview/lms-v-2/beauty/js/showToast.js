function injectContainer() {
    let el = document.getElementById('toast-container');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast-container';
      el.className = 'fixed top-5 right-5 z-50 space-y-3';
      document.body.appendChild(el);
    }
    return el;
  }
  
  function getBgClass(type) {
    if (type === 'primary') return 'bg-indigo-300 text-black';
    if (type === 'secondary') return 'bg-purple-200 text-black';
    if (type === 'info') return 'bg-blue-200 text-black';
    if (type === 'success') return 'bg-green-100 text-black';
    if (type === 'warning') return 'bg-yellow-300 text-black';
    if (type === 'danger') return 'bg-red-500 text-white';
    return 'bg-gray-200 text-black';
  }
  
  function getRemixCloseIcon() {
    const icon = document.createElement('i');
    icon.className = 'ri-close-line text-xl';
    return icon;
  }
  
  function createCloseButton(toast) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ml-auto hover:opacity-50 rotate-0 hover:rotate-180 transition-all duration-300';
    btn.appendChild(getRemixCloseIcon());
    btn.onclick = () => toast.remove();
    return btn;
  }
  
  export function showToast(message, type = 'info') {
    const container = injectContainer();
    const toast = document.createElement('div');
    toast.className = 'flex items-center rounded p-3 shadow-md ' + getBgClass(type);
    toast.style.animation = 'fadeInOut 4s ease forwards';
  
    const text = document.createElement('span');
    text.className = 'pr-2';
    text.textContent = message;
  
    toast.appendChild(text);
    toast.appendChild(createCloseButton(toast));
    container.appendChild(toast);
  
    setTimeout(() => {
      if (toast && toast.parentNode) toast.remove();
    }, 4000);
  }
  
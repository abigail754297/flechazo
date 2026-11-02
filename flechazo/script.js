/* ==========================================================================
   1. GESTIÓN INTERNA DE DATOS
   ========================================================================== */

const INITIAL_DATA = {
    usuarios: [
        { id: 1, nombre: 'Ana Valdivia', email: 'ana.v@flechazo.com', password_hash: 'hash123', telefono: '+51 981112233', fecha_nacimiento: '1998-05-14', estado_cuenta: 'Activo', fecha_registro: '2026-01-10 10:00:00' },
        { id: 2, nombre: 'Mateo Rossi', email: 'mateo.r@flechazo.com', password_hash: 'hash123', telefono: '+51 982223344', fecha_nacimiento: '1994-11-20', estado_cuenta: 'Activo', fecha_registro: '2026-01-12 14:30:00' },
        { id: 3, nombre: 'Sofia Castro', email: 'sofia.c@flechazo.com', password_hash: 'hash123', telefono: '+51 983334455', fecha_nacimiento: '2000-03-08', estado_cuenta: 'Activo', fecha_registro: '2026-01-15 09:15:00' },
        { id: 4, nombre: 'Diego Morales', email: 'diego.m@flechazo.com', password_hash: 'hash123', telefono: '+51 984445566', fecha_nacimiento: '1992-08-25', estado_cuenta: 'Activo', fecha_registro: '2026-01-18 18:20:00' },
        { id: 5, nombre: 'Valentina Gomez', email: 'valen.g@flechazo.com', password_hash: 'hash123', telefono: '+51 985556677', fecha_nacimiento: '1997-09-02', estado_cuenta: 'Activo', fecha_registro: '2026-01-20 11:45:00' }
    ],
    perfiles: [
        { id: 1, usuario_id: 1, genero: 'Femenino', ciudad: 'Lima', ocupacion: 'Diseñadora de Moda', descripcion: 'Amante de la fotografía, el arte urbano y las caminatas al atardecer.', foto_perfil: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80' },
        { id: 2, usuario_id: 2, genero: 'Masculino', ciudad: 'Cusco', ocupacion: 'Chef Ejecutivo', descripcion: 'Apasionado por la gastronomía fusión y las aventuras en la montaña.', foto_perfil: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80' },
        { id: 3, usuario_id: 3, genero: 'Femenino', ciudad: 'Arequipa', ocupacion: 'Arquitecta', descripcion: 'Fan del café por las mañanas y los libros de misterio.', foto_perfil: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80' },
        { id: 4, usuario_id: 4, genero: 'Masculino', ciudad: 'Lima', ocupacion: 'Ingeniero de Software', descripcion: 'Desarrollador de día, guitarrista de rock de noche.', foto_perfil: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80' },
        { id: 5, usuario_id: 5, genero: 'Femenino', ciudad: 'Trujillo', ocupacion: 'Médica Veterinaria', descripcion: 'Amante incondicional de los animales, el surf y la vida sana.', foto_perfil: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80' }
    ],
    preferencias: [
        { id: 1, usuario_id: 1, interes_genero: 'Hombres', edad_min: 25, edad_max: 40, distancia_max_km: 50 }
    ],
    flechazos: [
        { id: 1, remitente_id: 2, receptor_id: 1, estado: 'Aceptado', fecha_interaccion: '2026-02-01 12:00:00' },
        { id: 2, remitente_id: 1, receptor_id: 2, estado: 'Aceptado', fecha_interaccion: '2026-02-01 12:05:00' }
    ],
    mensajes: [
        { id: 1, remitente_id: 2, receptor_id: 1, contenido: '¡Hola Ana! Qué genial tu perfil. ¿También te gusta la fotografía?', leido: true, fecha_envio: '2026-02-01 12:10:00' },
        { id: 2, remitente_id: 1, receptor_id: 2, contenido: '¡Hola Mateo! Sí, me encanta. ¡Qué coincidencia!', leido: true, fecha_envio: '2026-02-01 12:15:00' }
    ],
    suscripciones: [
        { id: 1, usuario_id: 1, tipo_plan: 'VIP', fecha_inicio: '2026-01-10', fecha_fin: '2027-01-10', estado_pago: 'Completado' },
        { id: 2, usuario_id: 2, tipo_plan: 'Gold', fecha_inicio: '2026-01-12', fecha_fin: '2026-07-12', estado_pago: 'Completado' }
    ]
};

function initStorage() {
    if (!localStorage.getItem('flechazo_app_data')) {
        localStorage.setItem('flechazo_app_data', JSON.stringify(INITIAL_DATA));
    }
}

function getData() {
    initStorage();
    return JSON.parse(localStorage.getItem('flechazo_app_data'));
}

function saveData(data) {
    localStorage.setItem('flechazo_app_data', JSON.stringify(data));
    actualizarBadges();
    if (document.getElementById('role-select').value === 'admin') {
        renderAdminData();
    }
}

let currentUserId = 1;

/* ==========================================================================
   2. NAVEGACIÓN Y CAMBIO DE ROL (CLIENTE VS ADMIN)
   ========================================================================== */

function switchRole(role) {
    const portalCliente = document.getElementById('portal-cliente');
    const portalAdmin = document.getElementById('portal-admin');
    const navCliente = document.getElementById('nav-cliente');
    const navAdmin = document.getElementById('nav-admin');
    const roleSelect = document.getElementById('role-select');

    if (role === 'admin') {
        const passwordIngresada = prompt("Ingrese la contraseña de Administrador:");
        if (passwordIngresada !== "CHAmaya90.") {
            alert("Contraseña incorrecta. Acceso denegado.");
            roleSelect.value = "cliente";
            return;
        }

        portalCliente.classList.add('hidden');
        navCliente.classList.add('hidden');
        navCliente.classList.remove('flex');
        
        portalAdmin.classList.remove('hidden');
        navAdmin.classList.remove('hidden');
        navAdmin.classList.add('flex');

        showAdminTab('admin-dashboard');
        renderAdminData();
    } else {
        portalAdmin.classList.add('hidden');
        navAdmin.classList.add('hidden');
        navAdmin.classList.remove('flex');

        portalCliente.classList.remove('hidden');
        navCliente.classList.remove('hidden');
        navCliente.classList.flex ? null : navCliente.classList.add('flex');

        switchTab('inicio');
    }
}

function showAdminTab(tabId) {
    const adminTabs = ['admin-dashboard', 'admin-usuarios', 'admin-reportes'];
    adminTabs.forEach(tab => {
        const sec = document.getElementById(`sec-${tab}`);
        const btn = document.getElementById(`tab-${tab}`);
        if (tab === tabId) {
            sec.classList.remove('hidden');
            if (btn) btn.className = "px-3 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/40 font-bold";
        } else {
            sec.classList.add('hidden');
            if (btn) btn.className = "px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5";
        }
    });
}

function renderAdminData() {
    const data = getData();

    document.getElementById('kpi-usuarios').innerText = data.usuarios.length;
    document.getElementById('kpi-matches').innerText = data.flechazos.filter(f => f.estado === 'Aceptado').length;
    document.getElementById('kpi-suscripciones').innerText = data.suscripciones.filter(s => s.tipo_plan !== 'Gratuito').length;

    const tbodyUsers = document.getElementById('admin-tabla-usuarios');
    tbodyUsers.innerHTML = '';
    data.usuarios.forEach(u => {
        const perfil = data.perfiles.find(p => p.usuario_id === u.id) || {};
        const sub = data.suscripciones.find(s => s.usuario_id === u.id) || { tipo_plan: 'Gratuito' };

        const row = `
            <tr class="hover:bg-white/5">
                <td class="p-4 font-mono text-gray-400">#${u.id}</td>
                <td class="p-4 font-bold text-white">${u.nombre}</td>
                <td class="p-4">${u.email}</td>
                <td class="p-4">${perfil.ciudad || 'N/A'}</td>
                <td class="p-4"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${sub.tipo_plan === 'VIP' ? 'bg-flechazo-pink/20 text-flechazo-pink border border-flechazo-pink/40' : sub.tipo_plan === 'Gold' ? 'bg-flechazo-gold/20 text-flechazo-gold border border-flechazo-gold/40' : 'bg-gray-800 text-gray-400'}">${sub.tipo_plan}</span></td>
                <td class="p-4"><span class="text-emerald-400 font-semibold">${u.estado_cuenta}</span></td>
                <td class="p-4 text-center">
                    <button onclick="cambiarEstadoUsuario(${u.id})" class="px-2.5 py-1 rounded bg-red-950 text-red-400 border border-red-800 hover:bg-red-900 transition-colors">
                        ${u.estado_cuenta === 'Activo' ? 'Suspender' : 'Activar'}
                    </button>
                </td>
            </tr>
        `;
        tbodyUsers.innerHTML += row;
    });

    const tbodySubs = document.getElementById('admin-tabla-suscripciones');
    tbodySubs.innerHTML = '';
    data.suscripciones.forEach(s => {
        const row = `
            <tr class="hover:bg-white/5">
                <td class="p-4 font-mono text-gray-400">#${s.id}</td>
                <td class="p-4 font-mono text-gray-400">#${s.usuario_id}</td>
                <td class="p-4 font-bold text-flechazo-gold">${s.tipo_plan}</td>
                <td class="p-4 font-mono">${s.fecha_inicio}</td>
                <td class="p-4"><span class="text-emerald-400 font-semibold">${s.estado_pago}</span></td>
            </tr>
        `;
        tbodySubs.innerHTML += row;
    });
}

function cambiarEstadoUsuario(userId) {
    const data = getData();
    const user = data.usuarios.find(u => u.id === userId);
    if (user) {
        user.estado_cuenta = user.estado_cuenta === 'Activo' ? 'Suspendido' : 'Activo';
        saveData(data);
    }
}

function switchTab(tabId) {
    const sections = ['inicio', 'registro', 'explorar', 'flechazos', 'mensajes'];
    sections.forEach(sec => {
        const el = document.getElementById(`sec-${sec}`);
        const btn = document.getElementById(`tab-${sec}`);
        if (sec === tabId) {
            el.classList.remove('hidden');
            if(btn) btn.className = "nav-btn px-3 py-2 rounded-lg transition-all flex items-center gap-2 text-flechazo-gold border border-flechazo-gold/40 bg-flechazo-gold/10 font-bold shadow-gold-glow";
        } else {
            el.classList.add('hidden');
            if(btn) btn.className = "nav-btn px-3 py-2 rounded-lg transition-all flex items-center gap-2 text-gray-400 hover:text-white hover:bg-white/5";
        }
    });

    if (tabId === 'explorar') renderSolteros();
    if (tabId === 'flechazos') renderFlechazos();
    if (tabId === 'mensajes') renderChatUsers();
}

/* ==========================================================================
   3. REGISTRO
   ========================================================================== */

function guardarRegistro(e) {
    e.preventDefault();
    const data = getData();

    const nombre = document.getElementById('reg-nombre').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const telefono = document.getElementById('reg-telefono').value;
    const nacimiento = document.getElementById('reg-nacimiento').value;
    const genero = document.getElementById('reg-genero').value;
    const ciudad = document.getElementById('reg-ciudad').value;
    const ocupacion = document.getElementById('reg-ocupacion').value;
    const descripcion = document.getElementById('reg-descripcion').value;
    const interes = document.getElementById('reg-interes').value;
    const edadMin = parseInt(document.getElementById('reg-edad-min').value);
    const edadMax = parseInt(document.getElementById('reg-edad-max').value);
    const plan = document.querySelector('input[name="plan"]:checked').value;

    const avatars = [
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80'
    ];
    const foto = avatars[Math.floor(Math.random() * avatars.length)];

    const newUserId = data.usuarios.length > 0 ? Math.max(...data.usuarios.map(u => u.id)) + 1 : 1;
    const fechaNow = new Date().toISOString().replace('T', ' ').substring(0, 19);

    data.usuarios.push({
        id: newUserId,
        nombre,
        email,
        password_hash: 'hash_' + Math.random().toString(36).substring(7),
        telefono,
        fecha_nacimiento: nacimiento,
        estado_cuenta: 'Activo',
        fecha_registro: fechaNow
    });

    data.perfiles.push({
        id: data.perfiles.length + 1,
        usuario_id: newUserId,
        genero,
        ciudad,
        ocupacion: ocupacion || 'Miembro del Club',
        descripcion: descripcion || '¡Nuevo en Flechazo!',
        foto_perfil: foto
    });

    data.preferencias.push({
        id: data.preferencias.length + 1,
        usuario_id: newUserId,
        interes_genero: interes,
        edad_min: edadMin,
        edad_max: edadMax,
        distancia_max_km: 50
    });

    data.suscripciones.push({
        id: data.suscripciones.length + 1,
        usuario_id: newUserId,
        tipo_plan: plan,
        fecha_inicio: fechaNow.substring(0, 10),
        fecha_fin: plan === 'Gratuito' ? null : '2027-01-01',
        estado_pago: 'Completado'
    });

    saveData(data);
    currentUserId = newUserId;

    alert(`¡Bienvenido/a ${nombre}! Tu registro ha sido procesado con éxito.`);
    document.getElementById('form-registro').reset();
    switchTab('explorar');
}

/* ==========================================================================
   4. EXPLORAR Y FLECHAZOS
   ========================================================================== */

let filtroGeneroActual = 'Todos';

function filtrarSolteros(genero) {
    filtroGeneroActual = genero;
    renderSolteros();
}

function renderSolteros() {
    const data = getData();
    const grid = document.getElementById('grid-solteros');
    grid.innerHTML = '';

    let candidatos = data.perfiles.filter(p => p.usuario_id !== currentUserId);

    if (filtroGeneroActual !== 'Todos') {
        candidatos = candidatos.filter(p => p.genero === filtroGeneroActual);
    }

    if (candidatos.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-gray-500">No hay perfiles disponibles en este momento.</div>`;
        return;
    }

    candidatos.forEach(perfil => {
        const usuario = data.usuarios.find(u => u.id === perfil.usuario_id) || {};
        const sub = data.suscripciones.find(s => s.usuario_id === perfil.usuario_id) || { tipo_plan: 'Gratuito' };
        
        let edad = 25;
        if (usuario.fecha_nacimiento) {
            const yearNac = new Date(usuario.fecha_nacimiento).getFullYear();
            edad = new Date().getFullYear() - yearNac;
        }

        const yaFlechado = data.flechazos.some(f => f.remitente_id === currentUserId && f.receptor_id === perfil.usuario_id);

        const cardHTML = `
            <div class="bg-flechazo-card rounded-2xl overflow-hidden border border-flechazo-gold/30 hover:border-flechazo-gold transition-all duration-300 shadow-lg flex flex-col group">
                <div class="relative h-64 overflow-hidden">
                    <img src="${perfil.foto_perfil}" alt="${usuario.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-flechazo-card via-transparent to-transparent"></div>
                    
                    <span class="absolute top-3 right-3 text-[10px] font-extrabold px-2 py-1 rounded-full uppercase tracking-wider ${sub.tipo_plan === 'VIP' ? 'bg-flechazo-pink text-white shadow-red-glow' : sub.tipo_plan === 'Gold' ? 'bg-flechazo-gold text-black shadow-gold-glow' : 'bg-black/60 text-gray-300'}">
                        ${sub.tipo_plan === 'VIP' ? '🔥 VIP' : sub.tipo_plan === 'Gold' ? '⭐ GOLD' : 'SOLTERO'}
                    </span>

                    <div class="absolute bottom-3 left-3 right-3">
                        <h3 class="text-xl font-bold text-white font-serif flex items-center gap-2">
                            ${usuario.nombre}, ${edad}
                        </h3>
                        <p class="text-xs text-flechazo-gold flex items-center gap-1">
                            <i class="fa-solid fa-location-dot"></i> ${perfil.ciudad} • <span class="text-gray-300">${perfil.ocupacion}</span>
                        </p>
                    </div>
                </div>

                <div class="p-4 flex-grow flex flex-col justify-between space-y-4">
                    <p class="text-xs text-gray-300 italic line-clamp-2">"${perfil.descripcion}"</p>
                    
                    <button onclick="enviarFlechazo(${perfil.usuario_id})" ${yaFlechado ? 'disabled' : ''} class="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${yaFlechado ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-flechazo-red to-flechazo-pink hover:from-flechazo-pink hover:to-flechazo-red text-white shadow-red-glow active:scale-95'}">
                        <i class="fa-solid ${yaFlechado ? 'fa-heart-circle-check' : 'fa-heart-circle-bolt'} text-sm"></i>
                        ${yaFlechado ? 'Flechazo Enviado' : 'Enviar Flechazo ❤️'}
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
}

function enviarFlechazo(receptorId) {
    const data = getData();
    const fechaNow = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const flechazoPrevio = data.flechazos.find(f => f.remitente_id === receptorId && f.receptor_id === currentUserId);
    
    let esMatch = false;
    let estadoFlechazo = 'Pendiente';

    if (flechazoPrevio) {
        esMatch = true;
        estadoFlechazo = 'Aceptado';
        flechazoPrevio.estado = 'Aceptado';
    }

    data.flechazos.push({
        id: data.flechazos.length + 1,
        remitente_id: currentUserId,
        receptor_id: receptorId,
        estado: estadoFlechazo,
        fecha_interaccion: fechaNow
    });

    saveData(data);
    renderSolteros();

    if (esMatch) {
        const targetUser = data.usuarios.find(u => u.id === receptorId);
        document.getElementById('modal-match-name').innerText = targetUser ? targetUser.nombre : 'Alguien';
        document.getElementById('modal-match').classList.remove('hidden');
    }
}

function cerrarModalMatch() {
    document.getElementById('modal-match').classList.add('hidden');
}

/* ==========================================================================
   5. FLECHAZOS & CHAT
   ========================================================================== */

function renderFlechazos() {
    const data = getData();
    const container = document.getElementById('lista-flechazos');
    container.innerHTML = '';

    const misFlechazos = data.flechazos.filter(f => f.remitente_id === currentUserId || f.receptor_id === currentUserId);

    if (misFlechazos.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-500">Aún no tienes flechazos interactuados.</div>`;
        return;
    }

    misFlechazos.forEach(f => {
        const partnerId = f.remitente_id === currentUserId ? f.receptor_id : f.remitente_id;
        const partnerUser = data.usuarios.find(u => u.id === partnerId) || {};
        const partnerPerfil = data.perfiles.find(p => p.usuario_id === partnerId) || {};

        const item = `
            <div class="bg-flechazo-card p-4 rounded-xl border border-gray-800 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <img src="${partnerPerfil.foto_perfil || 'https://via.placeholder.com/100'}" class="w-12 h-12 rounded-full object-cover border border-flechazo-gold">
                    <div>
                        <h4 class="font-bold text-white text-sm">${partnerUser.nombre || 'Usuario'}</h4>
                        <span class="text-[10px] text-gray-400 font-mono">${f.fecha_interaccion}</span>
                    </div>
                </div>
                <div>
                    <span class="text-xs px-2.5 py-1 rounded-full font-bold uppercase ${f.estado === 'Aceptado' ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-yellow-950 text-yellow-400 border border-yellow-700'}">
                        ${f.estado === 'Aceptado' ? '❤️ Match' : 'Pendiente'}
                    </span>
                </div>
            </div>
        `;
        container.innerHTML += item;
    });
}

let activeChatPartnerId = null;

function renderChatUsers() {
    const data = getData();
    const list = document.getElementById('chat-users-list');
    list.innerHTML = '';

    const matches = data.flechazos.filter(f => (f.remitente_id === currentUserId || f.receptor_id === currentUserId) && f.estado === 'Aceptado');

    if (matches.length === 0) {
        list.innerHTML = `<div class="p-4 text-center text-xs text-gray-500">Sin conversaciones activas aún.</div>`;
        return;
    }

    const uniquePartnerIds = [...new Set(matches.map(f => f.remitente_id === currentUserId ? f.receptor_id : f.remitente_id))];

    uniquePartnerIds.forEach(pId => {
        const user = data.usuarios.find(u => u.id === pId);
        const perfil = data.perfiles.find(p => p.usuario_id === pId);

        if (!user) return;

        const activeClass = activeChatPartnerId === pId ? 'bg-flechazo-gold/20 border-l-4 border-flechazo-gold' : 'hover:bg-white/5';

        const userItem = `
            <div onclick="abrirChat(${pId})" class="p-3 flex items-center gap-3 cursor-pointer transition-all ${activeClass}">
                <img src="${perfil ? perfil.foto_perfil : ''}" class="w-10 h-10 rounded-full object-cover">
                <div class="flex-grow overflow-hidden">
                    <h5 class="text-xs font-bold text-white truncate">${user.nombre}</h5>
                    <span class="text-[10px] text-flechazo-gold block">Match Confirmado</span>
                </div>
            </div>
        `;
        list.innerHTML += userItem;
    });
}

function abrirChat(partnerId) {
    activeChatPartnerId = partnerId;
    const data = getData();
    const partnerUser = data.usuarios.find(u => u.id === partnerId);
    const partnerPerfil = data.perfiles.find(p => p.usuario_id === partnerId);

    document.getElementById('chat-user-name').innerText = partnerUser ? partnerUser.nombre : 'Chat';
    document.getElementById('chat-user-status').innerText = partnerPerfil ? partnerPerfil.ciudad : 'En línea';
    document.getElementById('chat-avatar').innerHTML = partnerPerfil ? `<img src="${partnerPerfil.foto_perfil}" class="w-full h-full rounded-full object-cover">` : '?';

    document.getElementById('chat-input').disabled = false;
    document.getElementById('chat-btn-send').disabled = false;

    renderChatMessages();
    renderChatUsers();
}

function renderChatMessages() {
    if (!activeChatPartnerId) return;
    const data = getData();
    const chatBody = document.getElementById('chat-body');
    chatBody.innerHTML = '';

    const msgs = data.mensajes.filter(m => 
        (m.remitente_id === currentUserId && m.receptor_id === activeChatPartnerId) ||
        (m.remitente_id === activeChatPartnerId && m.receptor_id === currentUserId)
    ).sort((a,b) => new Date(a.fecha_envio) - new Date(b.fecha_envio));

    if (msgs.length === 0) {
        chatBody.innerHTML = `<div class="text-center text-gray-500 text-xs py-8">Envía tu primer mensaje para romper el hielo.</div>`;
        return;
    }

    msgs.forEach(m => {
        const esMio = m.remitente_id === currentUserId;
        const bubble = `
            <div class="flex ${esMio ? 'justify-end' : 'justify-start'} mb-2">
                <div class="max-w-[75%] p-3 rounded-2xl text-xs ${esMio ? 'bg-gradient-to-r from-flechazo-red to-flechazo-pink text-white rounded-br-none' : 'bg-flechazo-dark border border-gray-700 text-gray-200 rounded-bl-none'}">
                    <p>${m.contenido}</p>
                    <span class="text-[9px] opacity-60 block text-right mt-1 font-mono">${m.fecha_envio.substring(11,16)}</span>
                </div>
            </div>
        `;
        chatBody.innerHTML += bubble;
    });

    chatBody.scrollTop = chatBody.scrollHeight;
}

function enviarMensaje(e) {
    e.preventDefault();
    if (!activeChatPartnerId) return;

    const input = document.getElementById('chat-input');
    const texto = input.value.trim();
    if (!texto) return;

    const data = getData();
    const fechaNow = new Date().toISOString().replace('T', ' ').substring(0, 19);

    data.mensajes.push({
        id: data.mensajes.length + 1,
        remitente_id: currentUserId,
        receptor_id: activeChatPartnerId,
        contenido: texto,
        leido: false,
        fecha_envio: fechaNow
    });

    saveData(data);
    input.value = '';
    renderChatMessages();
}

function actualizarBadges() {
    const data = getData();
    const matchesCount = data.flechazos.filter(f => f.estado === 'Aceptado').length;
    const badge = document.getElementById('badge-matches');
    if (matchesCount > 0) {
        badge.innerText = matchesCount;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

/* ==========================================================================
   6. ANIMACIÓN DE FONDO
   ========================================================================== */

const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 12 + 6;
        this.speedY = Math.random() * 0.8 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.4 ? '#E60039' : '#DFA845';
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -20) {
            this.y = canvas.height + 20;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = `${this.size}px FontAwesome`;
        ctx.fillText('♥', this.x, this.y);
        ctx.restore();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 35; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

window.onload = function() {
    initStorage();
    initParticles();
    animateParticles();
    actualizarBadges();
};
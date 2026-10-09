const htmlElement = document.documentElement;
const btnLight = document.getElementById('btnLight');
const btnDark = document.getElementById('btnDark');
const btnSystem = document.getElementById('btnSystem');
const statusTexto = document.getElementById('statusTexto');
const abrirMenu = document.getElementById('abrirMenu');
const fecharMenu = document.getElementById('fecharMenu');
const sidebar = document.getElementById('sidebar');
const fundoMenu = document.getElementById('fundoMenu');
const btnUsuario = document.getElementById('btnUsuario');
const menuUsuario = document.getElementById('menuUsuario');
const btnNovoProjeto = document.getElementById('btnNovoProjeto');
const modalProjeto = document.getElementById('modalProjeto');
const fecharModal = document.getElementById('fecharModal');
const cancelarProjeto = document.getElementById('cancelarProjeto');
const formProjeto = document.getElementById('formProjeto');
const salvarProjeto = document.getElementById('salvarProjeto');
const mensagemFormulario = document.getElementById('mensagemFormulario');
const mensagemSucesso = document.getElementById('mensagemSucesso');
const listaProjetos = document.getElementById('listaProjetos');
const pesquisa = document.getElementById('pesquisa');
const filtroStatus = document.getElementById('filtroStatus');
const quantidadeProjetos = document.getElementById('quantidadeProjetos');
const semResultados = document.getElementById('semResultados');
const ativos = document.getElementById('ativos');
const concluidos = document.getElementById('concluidos');
const pendentes = document.getElementById('pendentes');
const equipes = document.getElementById('equipes');

const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)');
const mediaQueryDesktop = window.matchMedia('(min-width: 1024px)');

const classeAtivo = ['bg-white', 'dark:bg-slate-700', 'shadow-sm', 'text-slate-900', 'dark:text-white'];
const classeInativo = ['text-slate-500', 'dark:text-slate-400', 'hover:text-slate-900', 'dark:hover:text-white'];
const botoesTema = [btnLight, btnDark, btnSystem];
let temaAtual = 'system';

try {
    const temaArmazenado = localStorage.getItem('theme');

    if (temaArmazenado === 'light' || temaArmazenado === 'dark' || temaArmazenado === 'system') {
        temaAtual = temaArmazenado;
    }
} catch (erro) {
    temaAtual = 'system';
}

function aplicarTema() {
    const modoEscuro = temaAtual === 'dark' || (temaAtual === 'system' && mediaQueryDark.matches);

    if (modoEscuro) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    botoesTema.forEach(function (botao) {
        botao.classList.remove(...classeAtivo);
        botao.classList.add(...classeInativo);
        botao.setAttribute('aria-pressed', 'false');
    });

    let botaoAtivo = btnSystem;

    if (temaAtual === 'light') {
        botaoAtivo = btnLight;
    } else if (temaAtual === 'dark') {
        botaoAtivo = btnDark;
    }

    botaoAtivo.classList.remove(...classeInativo);
    botaoAtivo.classList.add(...classeAtivo);
    botaoAtivo.setAttribute('aria-pressed', 'true');

    if (temaAtual === 'system') {
        statusTexto.textContent = 'Tema do sistema: ' + (modoEscuro ? 'escuro' : 'claro');
    } else {
        statusTexto.textContent = 'Tema selecionado: ' + (modoEscuro ? 'escuro' : 'claro');
    }
}

function alterarTema(tema) {
    temaAtual = tema;
    aplicarTema();

    try {
        localStorage.setItem('theme', tema);
    } catch (erro) {
        statusTexto.textContent += ' (o navegador bloqueou o salvamento da preferência)';
    }
}

btnLight.addEventListener('click', function () {
    alterarTema('light');
});

btnDark.addEventListener('click', function () {
    alterarTema('dark');
});

btnSystem.addEventListener('click', function () {
    alterarTema('system');
});

mediaQueryDark.addEventListener('change', aplicarTema);

let menuAberto = false;

function abrirSidebar() {
    if (mediaQueryDesktop.matches) {
        return;
    }

    menuAberto = true;
    sidebar.classList.remove('-translate-x-full');
    sidebar.inert = false;
    fundoMenu.hidden = false;
    abrirMenu.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    fecharMenu.focus();
}

function fecharSidebar(devolverFoco) {
    menuAberto = false;
    sidebar.classList.add('-translate-x-full');
    sidebar.inert = !mediaQueryDesktop.matches;
    fundoMenu.hidden = true;
    abrirMenu.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    if (devolverFoco && !mediaQueryDesktop.matches) {
        abrirMenu.focus();
    }
}

abrirMenu.addEventListener('click', abrirSidebar);
fecharMenu.addEventListener('click', function () {
    fecharSidebar(true);
});
fundoMenu.addEventListener('click', function () {
    fecharSidebar(true);
});

sidebar.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        fecharSidebar(false);
    });
});

mediaQueryDesktop.addEventListener('change', function () {
    fecharSidebar(false);
});

function fecharDropdown() {
    menuUsuario.hidden = true;
    btnUsuario.setAttribute('aria-expanded', 'false');
}

btnUsuario.addEventListener('click', function () {
    menuUsuario.hidden = !menuUsuario.hidden;
    btnUsuario.setAttribute('aria-expanded', String(!menuUsuario.hidden));
});

menuUsuario.querySelector('a').addEventListener('click', fecharDropdown);

document.addEventListener('click', function (evento) {
    if (!menuUsuario.contains(evento.target) && !btnUsuario.contains(evento.target)) {
        fecharDropdown();
    }
});

document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') {
        if (menuAberto) {
            fecharSidebar(true);
        }

        if (!menuUsuario.hidden) {
            fecharDropdown();
            btnUsuario.focus();
        }
    }

    if (evento.key === 'Tab' && menuAberto) {
        const elementosMenu = sidebar.querySelectorAll('button, a');
        const primeiroElemento = elementosMenu[0];
        const ultimoElemento = elementosMenu[elementosMenu.length - 1];

        if (evento.shiftKey && document.activeElement === primeiroElemento) {
            evento.preventDefault();
            ultimoElemento.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimoElemento) {
            evento.preventDefault();
            primeiroElemento.focus();
        }
    }
});

function filtrarProjetos() {
    const termo = pesquisa.value.trim().toLowerCase();
    const status = filtroStatus.value;
    const projetos = listaProjetos.querySelectorAll('.projeto');
    let quantidade = 0;

    projetos.forEach(function (projeto) {
        const nome = projeto.querySelector('.nome-projeto').textContent.toLowerCase();
        const responsavel = projeto.querySelector('.responsavel').textContent.toLowerCase();
        const categoria = projeto.dataset.categoria.toLowerCase();
        const correspondePesquisa = nome.includes(termo) || responsavel.includes(termo) || categoria.includes(termo);
        const correspondeStatus = status === 'todos' || projeto.dataset.status === status;

        projeto.hidden = !(correspondePesquisa && correspondeStatus);

        if (!projeto.hidden) {
            quantidade++;
        }
    });

    quantidadeProjetos.textContent = '(' + quantidade + ')';
    semResultados.hidden = quantidade > 0;
}

pesquisa.addEventListener('input', filtrarProjetos);
filtroStatus.addEventListener('change', filtrarProjetos);

function atualizarIndicadores() {
    const projetos = listaProjetos.querySelectorAll('.projeto');
    let totalAtivos = 0;
    let totalConcluidos = 0;
    let totalPendentes = 0;
    const categorias = [];

    projetos.forEach(function (projeto) {
        if (projeto.dataset.status === 'concluido') {
            totalConcluidos++;
        } else {
            totalAtivos++;
        }

        totalPendentes += Number(projeto.dataset.tarefas);

        if (!categorias.includes(projeto.dataset.categoria)) {
            categorias.push(projeto.dataset.categoria);
        }
    });

    ativos.textContent = totalAtivos;
    concluidos.textContent = totalConcluidos;
    pendentes.textContent = totalPendentes;
    equipes.textContent = categorias.length;
}

const nome = document.getElementById('nome');
const responsavel = document.getElementById('responsavel');
const categoria = document.getElementById('categoria');
const prioridade = document.getElementById('prioridade');
const prazo = document.getElementById('prazo');
const descricao = document.getElementById('descricao');
const camposFormulario = [nome, responsavel, categoria, prioridade, prazo, descricao];

function dataHoje() {
    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    return ano + '-' + mes + '-' + dia;
}

function limparFormulario() {
    formProjeto.reset();
    mensagemFormulario.textContent = '';
    prazo.min = dataHoje();

    camposFormulario.forEach(function (campo) {
        campo.classList.remove('campo-erro', 'campo-sucesso');
        campo.removeAttribute('aria-invalid');
        document.getElementById('erro-' + campo.id).textContent = '';
    });
}

btnNovoProjeto.addEventListener('click', function () {
    fecharDropdown();
    limparFormulario();
    modalProjeto.showModal();
    document.body.style.overflow = 'hidden';
    nome.focus();
});

fecharModal.addEventListener('click', function () {
    modalProjeto.close();
});

cancelarProjeto.addEventListener('click', function () {
    modalProjeto.close();
});

modalProjeto.addEventListener('close', function () {
    document.body.style.overflow = '';
    btnNovoProjeto.focus();
});

function validarCampo(campo) {
    const valor = campo.value.trim();
    let mensagem = '';

    if (valor === '') {
        mensagem = 'Preencha este campo.';
    } else if ((campo === nome || campo === responsavel) && valor.length < 3) {
        mensagem = 'Digite pelo menos 3 caracteres.';
    } else if (campo === descricao && valor.length < 10) {
        mensagem = 'Digite pelo menos 10 caracteres.';
    } else if (campo === prazo && (valor < dataHoje() || !campo.validity.valid)) {
        mensagem = 'Escolha uma data válida a partir de hoje.';
    }

    const valido = mensagem === '';
    campo.classList.toggle('campo-erro', !valido);
    campo.classList.toggle('campo-sucesso', valido);
    campo.setAttribute('aria-invalid', String(!valido));
    document.getElementById('erro-' + campo.id).textContent = mensagem;

    return valido;
}

camposFormulario.forEach(function (campo) {
    campo.addEventListener('blur', function () {
        validarCampo(campo);
    });

    campo.addEventListener('input', function () {
        if (campo.hasAttribute('aria-invalid')) {
            validarCampo(campo);
        }
    });

    campo.addEventListener('change', function () {
        if (campo.hasAttribute('aria-invalid')) {
            validarCampo(campo);
        }
    });
});

function cadastrarProjeto() {
    const novoCard = listaProjetos.lastElementChild.cloneNode(true);
    const partesData = prazo.value.split('-');

    novoCard.hidden = false;
    novoCard.dataset.status = 'andamento';
    novoCard.dataset.categoria = categoria.value;
    novoCard.dataset.tarefas = '0';
    novoCard.classList.remove('md:col-span-2', 'lg:col-span-1', 'lg:row-span-2');
    novoCard.querySelector('.nome-projeto').textContent = nome.value.trim();
    novoCard.querySelector('.responsavel').textContent = responsavel.value.trim();
    novoCard.querySelector('.categoria').textContent = categoria.value;
    novoCard.querySelector('.prioridade').textContent = 'Prioridade: ' + prioridade.value;
    novoCard.querySelector('.descricao').textContent = descricao.value.trim();
    novoCard.querySelector('.prazo').textContent = 'Prazo: ' + partesData[2] + '/' + partesData[1] + '/' + partesData[0];
    novoCard.querySelector('.status-projeto').textContent = 'Em andamento';
    novoCard.querySelector('.porcentagem').textContent = '0%';
    novoCard.querySelector('.barra-progresso').style.width = '0%';
    novoCard.querySelector('.progresso').setAttribute('aria-valuenow', '0');
    novoCard.querySelector('.progresso').setAttribute('aria-label', 'Progresso de ' + nome.value.trim());
    novoCard.querySelector('.tarefas').textContent = '0 tarefas pendentes';

    listaProjetos.appendChild(novoCard);
    pesquisa.value = '';
    filtroStatus.value = 'todos';
    atualizarIndicadores();
    filtrarProjetos();
}

let tempoMensagem;

formProjeto.addEventListener('submit', function (evento) {
    evento.preventDefault();
    let formularioValido = true;
    let primeiroErro = null;

    camposFormulario.forEach(function (campo) {
        if (!validarCampo(campo)) {
            formularioValido = false;

            if (primeiroErro === null) {
                primeiroErro = campo;
            }
        }
    });

    if (!formularioValido) {
        mensagemFormulario.textContent = 'Confira os campos destacados.';
        primeiroErro.focus();
        return;
    }

    salvarProjeto.disabled = true;

    try {
        cadastrarProjeto();
        modalProjeto.close();
        mensagemSucesso.textContent = 'Projeto cadastrado com sucesso!';
        mensagemSucesso.hidden = false;
        clearTimeout(tempoMensagem);
        tempoMensagem = setTimeout(function () {
            mensagemSucesso.hidden = true;
        }, 4000);
    } finally {
        salvarProjeto.disabled = false;
    }
});

aplicarTema();
fecharSidebar(false);
atualizarIndicadores();
filtrarProjetos();
import route from 'next/router';
import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import firebase from '../../firebase/config';
import Usuario from '../../models/User';
import UsuarioRepository from '../../models/UserRepository';
import UserFireBase from '../../db/Client';
import { getInitialValue } from '@testing-library/user-event/dist/types/document/UI';

interface AuthContextProps {
    usuario?: Usuario;
    carregando?: boolean;
    cadastrar?: (email: string, senha: string) => Promise<void>
    login?: (email: string, senha: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(usuarioFirebase: firebase.User, usuarioExistente?: Usuario): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken();
    return new Usuario(
        usuarioFirebase.uid,
        usuarioExistente?.name || usuarioFirebase.displayName || "",
        usuarioExistente?.email || usuarioFirebase.email || "",
        token,
        usuarioFirebase.providerData[0]?.providerId || "",
        usuarioExistente?.imageUrl || usuarioFirebase.photoURL || "",
        usuarioExistente?.cpf || 0,
        usuarioExistente?.phone || usuarioFirebase.phoneNumber || "",
        usuarioExistente?.historic || "",
        usuarioExistente?.address || {
            state: "",
            city: "",
            neighborhood: "",
            street: "",
            houseNumber: 0,
            adjunct: ""
        }
    );
}

function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set('iot-ecommerce', logado, {
            expires: 7
        });
    } else {
        Cookies.remove('iot-ecommerce')
    }
}

export function AuthProvider(props) {
    const [carregando, setCarregando] = useState(true);
    const [usuario, setUsuario] = useState<Usuario>();
    const repo = new UserFireBase();

    async function configurarSessao(usuarioFirebase) {
        if (usuarioFirebase?.email) {
            let usuarioExistente = await repo.obter({ id: usuarioFirebase.uid } as Usuario)
            let usuario = await usuarioNormalizado(usuarioFirebase, usuarioExistente)
            if (!usuarioExistente) {
                await repo.salvar(usuario)
            }
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            setUsuario(undefined)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function login(email, senha) {
        try {
            setCarregando(true)
            const resp = await firebase.auth().signInWithEmailAndPassword(email, senha)
            await configurarSessao(resp.user)
            window.location.href = '/'
        } finally {
            setCarregando(false)
        }
    }

    async function cadastrar(email, senha) {
        try {
            setCarregando(true)
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, senha)
            await configurarSessao(resp.user)
            window.location.href = '/'
        } finally {
            setCarregando(false)
        }
    }

    async function loginGoogle() {
        try {
            setCarregando(true);
            const auth = firebase.auth();
            const provider = new firebase.auth.GoogleAuthProvider();
            const resp = await auth.signInWithPopup(provider);
            await configurarSessao(resp.user);

            window.location.href = '/';
        } catch (error) {
            console.error("Erro durante o login:", error);
        } finally {
            setCarregando(false);
        }
    }

    async function logout() {
        try {
            setCarregando(true)
            await firebase.auth().signOut()
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if (Cookies.get('iot-ecommerce')) {
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao);
            return () => cancelar();
        } else {
            setCarregando(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            usuario,
            carregando,
            login,
            cadastrar,
            loginGoogle,
            logout,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

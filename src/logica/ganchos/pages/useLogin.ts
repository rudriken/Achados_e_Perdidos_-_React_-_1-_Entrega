import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServicoLogin } from "@/logica/servicos/ServicoLogin";
import { ServicoEstruturaFormulario } from "@/logica/servicos/ServicoEstruturaFormulario";
import { LoginInterface } from "@/logica/interfaces/interfaces";
import { ContextoDoLocalUsuario } from "@/logica/contextos/ContextoDoLocalUsuario";

export default function useLogin() {
    const formularioMetodosLogin = useForm<LoginInterface>({
            resolver: yupResolver(ServicoEstruturaFormulario.login()),
        }),
        [erro, alterarErro] = useState(false),
        [entrou, alterarEntrou] = useState(false),
        [esperarEntrar, alterarEsperarEntrar] = useState(false);
    const { despachoDoLocalUsuario } = useContext(ContextoDoLocalUsuario);

    async function logar(credenciais: LoginInterface): Promise<void> {
        alterarEsperarEntrar(true);
        const sucesso = await ServicoLogin.entrar(credenciais);
        if (sucesso) {
            alterarEntrou(true);
            const localUsuario = await ServicoLogin.informacoesDoLocalUsuario();
            if (localUsuario) {
                despachoDoLocalUsuario({ tipo: "ATUALIZAR_DADOS", carga: localUsuario });
            }
        } else {
            alterarErro(true);
            alterarEsperarEntrar(false);
        }
    }

    function deslogar() {
        ServicoLogin.sair();
        window.location.reload();
    }

    return {
        formularioMetodosLogin,
        logar,
        deslogar,
        erro,
        alterarErro,
        entrou,
        esperarEntrar,
        alterarEsperarEntrar,
    };
}

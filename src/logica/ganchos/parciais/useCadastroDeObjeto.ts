import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServicoApi } from "../../servicos/ServicoApi";
import { ServicoEstruturaFormulario } from "../../servicos/ServicoEstruturaFormulario";
import ServicoFormatador from "@/logica/servicos/ServicoFormatador";
import { ObjetoInterface } from "../../interfaces/interfaces";

export default function useCadastroDeObjeto() {
    const formularioMetodosCadastroObjeto = useForm<ObjetoInterface>({
        resolver: yupResolver(ServicoEstruturaFormulario.cadastroObjeto()),
    });
    const formularioMetodosInformaDono = useForm<ObjetoInterface>({
        resolver: yupResolver(ServicoEstruturaFormulario.informaDono()),
    });
    const [mensagem, alterarMensagem] = useState(false);
    const [imagemFile, alterarImagemFile] = useState({} as File);
    const [objetoTrabalhado, alterarObjetoTrabalhado] = useState({} as ObjetoInterface);
    const [campoAlterado, alterarCampoAlterado] = useState(false);
    const [esperar, alterarEsperar] = useState(false);

    async function cadastrarObjeto(dados: ObjetoInterface, imagemFileObjeto: File) {
        try {
            alterarEsperar(true);
            const objeto = (await ServicoApi.post<ObjetoInterface>("api/objetos", dados))
                .data;
            await ServicoApi.post(
                `api/objetos/${objeto.id}/imagem`,
                { imagem_objeto: imagemFileObjeto },
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            alterarEsperar(false);
            alterarMensagem(true);
            return objeto;
        } catch (erro) {
            alterarEsperar(false);
            return false;
        }
    }

    async function alterarObjeto(
        objetoDoBanco: ObjetoInterface,
        objetoAlterado: ObjetoInterface,
        imagemFileObjeto: File
    ) {
        const objetoASerGravado = { ...objetoDoBanco, ...objetoAlterado };
        try {
            alterarEsperar(true);
            const objeto = (
                await ServicoApi.put<ObjetoInterface>(`api/objetos/${objetoASerGravado.id}`, {
                    ...objetoASerGravado,
                })
            ).data;
            if (
                ServicoFormatador.caminhoRelativoDaImagem(objetoDoBanco.imagem, "objeto") !==
                objetoASerGravado.imagem
            ) {
                await ServicoApi.post(
                    `api/objetos/${objetoASerGravado.id}/imagem`,
                    { imagem_objeto: imagemFileObjeto },
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
            }
            alterarEsperar(false);
            alterarMensagem(true);
            return objeto;
        } catch (erro) {
            alterarEsperar(false);
            return false;
        }
    }

    async function excluirObjeto(objeto: ObjetoInterface) {
        try {
            await ServicoApi.delete(`api/objetos/${objeto.id}`);
            alterarMensagem(true);
            return objeto;
        } catch (erro) {
            return false;
        }
    }

    async function informarDono(objeto: ObjetoInterface, dados: ObjetoInterface) {
        alterarEsperar(true);
        const resposta = (
            await ServicoApi.post<{ message: string }>(
                `/api/objetos/${objeto.id}/donos`,
                dados
            )
        ).data;
        if (resposta) {
            alterarMensagem(true);
        }
        alterarEsperar(false);
    }

    return {
        formularioMetodosCadastroObjeto,
        cadastrarObjeto,
        alterarObjeto,
        excluirObjeto,
        mensagem,
        alterarMensagem,
        imagemFile,
        alterarImagemFile,
        objetoTrabalhado,
        alterarObjetoTrabalhado,
        campoAlterado,
        alterarCampoAlterado,
        formularioMetodosInformaDono,
        informarDono,
        esperar,
        alterarEsperar,
    };
}

import { MutableRefObject, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServicoApi } from "@/logica/servicos/ServicoApi";
import { ServicoEstruturaFormulario } from "@/logica/servicos/ServicoEstruturaFormulario";
import { parciais } from "@/logica/tipos/globais";
import { LocalInterface, ObjetoInterface } from "@/logica/interfaces/interfaces";

export default function useIndex() {
    const formularioMetodosIndex = useForm<LocalInterface>({
        resolver: yupResolver(ServicoEstruturaFormulario.buscaLocal()),
    });
    const [parcial, alterarParcial] = useState("index");
    const [locais, alterarLocais] = useState([] as LocalInterface[]);
    const [local, alterarLocal] = useState({} as LocalInterface);
    const [objetos, alterarObjetos] = useState([] as ObjetoInterface[]);
    const [nomeBuscado, alterarNomeBuscado] = useState("");
    const [mensagem, alterarMensagem] = useState(false);
    const [esperar, alterarEsperar] = useState(false);
    const [objeto, alterarObjeto] = useState({} as ObjetoInterface);

    async function consultar(busca: LocalInterface) {
        alterarEsperar(true);
        alterarNomeBuscado(busca.nome);
        const locaisEncontrados = (
            await ServicoApi.get<LocalInterface[]>(`/api/locais/busca?nome=${busca.nome}`)
        ).data;
        alterarLocais(locaisEncontrados);
        if (locaisEncontrados.length > 0) {
            alterarParcial(parciais.publicas[0]);
        } else {
            alterarEsperar(false);
            alterarMensagem(true);
        }
    }

    async function pegarObjetos(local: LocalInterface) {
        alterarLocal(local);
        const objetosEncontrados = (
            await ServicoApi.get<ObjetoInterface[]>(`/api/locais/${local.id}/objetos`)
        ).data;
        alterarEsperar(false);
        alterarObjetos(objetosEncontrados);
    }

    return {
        formularioMetodosIndex,
        consultar,
        parcial,
        alterarParcial,
        locais,
        local,
        pegarObjetos,
        objetos,
        nomeBuscado,
        mensagem,
        alterarMensagem,
        esperar,
        alterarEsperar,
        objeto,
        alterarObjeto,
    };
}

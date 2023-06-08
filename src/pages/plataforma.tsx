import { useEffect, useState } from "react";
import usePlataforma from "@/logica/ganchos/pages/usePlataforma";
import { parciais } from "@/logica/tipos/globais";
import ListarObjetos from "@/visual/parciais/_listar_objetos";
import AdicionarObjeto from "@/visual/parciais/_adicionar_objeto";
import ExibirObjeto from "@/visual/parciais/_exibir_objeto";
import EditarObjeto from "@/visual/parciais/_editar_objeto";
import ApagarObjeto from "@/visual/parciais/_apagar_objeto";
import Cabecalho from "@/visual/componentes/superficies/Cabecalho/Cabecalho";
import { ObjetoInterface } from "@/logica/interfaces/interfaces";

export default function Plataforma() {
    const {
        parcial,
        alterarParcial,
        estadoDosObjetos,
        despachoDosObjetos,
        estadoDoLocalUsuario,
        pegarObjetos,
    } = usePlataforma();
    const { usuario } = estadoDoLocalUsuario.local;
    const { objetos, buscando } = estadoDosObjetos;
    const [objeto, alterarObjeto] = useState({} as ObjetoInterface);
    let [novosObjetos, alterarNovosObjetos] = useState([] as ObjetoInterface[]);

    useEffect(() => {
        (async () => {
            await pegarObjetos();
            alterarParcial(parciais[0]);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        despachoDosObjetos({ tipo: "ATUALIZAR_OBJETOS", carga: novosObjetos });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [novosObjetos]);

    return (
        <>
            <Cabecalho
                usuario={usuario.nome}
                imagem={"img/logos/logo.svg"}
                link={"Objetos"}
                cardapio={["Alterar Dados", "Sair"]}
            />
            {parcial === parciais[0] && (
                <ListarObjetos
                    objetos={objetos}
                    buscando={buscando}
                    irPara_adicionar_objeto={() => {
                        alterarParcial(parciais[1]);
                    }}
                    irPara_exibir_objeto={(objeto) => {
                        alterarObjeto(objeto);
                        alterarParcial(parciais[2]);
                    }}
                    irPara_editar_objeto={(objeto) => {
                        alterarObjeto(objeto);
                        alterarParcial(parciais[3]);
                    }}
                    irPara_apagar_objeto={(objeto) => {
                        alterarObjeto(objeto);
                        alterarParcial(parciais[4]);
                    }}
                />
            )}

            {parcial === parciais[1] && (
                <AdicionarObjeto
                    irPara_listar_objetos={(objetoCriado) => {
                        alterarNovosObjetos([...objetos, objetoCriado]);
                        alterarParcial(parciais[0]);
                    }}
                />
            )}

            {parcial === parciais[2] && (
                <ExibirObjeto
                    objeto={objeto}
                    irPara_listar_objetos={(_objetoExibido) => {
                        alterarParcial(parciais[0]);
                    }}
                />
            )}

            {parcial === parciais[3] && (
                <EditarObjeto
                    objeto={objeto}
                    irPara_listar_objetos={(objetoEditado) => {
                        alterarNovosObjetos(
                            objetos.map((objeto) => {
                                if (objeto.id === objetoEditado.id) {
                                    return objetoEditado;
                                }
                                return objeto;
                            })
                        );
                        alterarParcial(parciais[0]);
                    }}
                />
            )}

            {parcial === parciais[4] && (
                <ApagarObjeto
                    objeto={objeto}
                    irPara_listar_objetos={(objetoExcluido) => {
                        // console.log(objetoExcluido, objetos);
                        alterarNovosObjetos(
                            objetos.filter((objeto) => objeto.id !== objetoExcluido.id)
                        );
                        alterarParcial(parciais[0]);
                    }}
                />
            )}
        </>
    );
}

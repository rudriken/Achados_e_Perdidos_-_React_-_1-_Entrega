import { FormProvider } from "react-hook-form";
import { Container } from "@mui/material";
import useCadastroDeObjeto from "@/logica/ganchos/parciais/useCadastroDeObjeto";
import { FormularioObjeto } from "../../componentes/entradas/Formularios/Formularios";
import TituloPagina from "../../componentes/exibe-dados/TituloPagina/TituloPagina";
import Botao from "../../componentes/entradas/Botao/Botao";
import Dialogo from "../../componentes/retorno/Dialogo/Dialogo";
import { conjuntoDeCampo } from "@/logica/tipos/globais";
import { ObjetoInterface } from "@/logica/interfaces/interfaces";

interface EditarObjetoProps {
    objeto: ObjetoInterface;
    irPara_listar_objetos: (objeto: ObjetoInterface) => void;
}

export default function EditarObjeto({ objeto, irPara_listar_objetos }: EditarObjetoProps) {
    const {
            formularioMetodosCadastroObjeto,
            alterarObjeto,
            mensagem,
            alterarMensagem,
            imagemFile,
            alterarImagemFile,
            campoAlterado,
            alterarCampoAlterado,
            objetoTrabalhado,
            alterarObjetoTrabalhado,
            esperar,
        } = useCadastroDeObjeto(),
        { handleSubmit } = formularioMetodosCadastroObjeto;

    return (
        <FormProvider {...formularioMetodosCadastroObjeto}>
            <Container>
                <TituloPagina
                    titulo={`Alterar objeto '${objeto.nome}'`}
                    subtitulo={"Altere qualquer dado deste objeto"}
                />
                <form
                    onSubmit={handleSubmit(async () => {
                        alterarObjetoTrabalhado(
                            (await alterarObjeto(
                                objeto,
                                formularioMetodosCadastroObjeto.getValues(),
                                imagemFile
                            )) as ObjetoInterface
                        );
                    })}
                    autoComplete={"on"}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <fieldset {...conjuntoDeCampo}>
                        <FormularioObjeto
                            imagemFileObjeto={(imagem) => alterarImagemFile(imagem)}
                            objeto={objeto}
                            qualquerCampoAlterado={(campoAlterado) => {
                                alterarCampoAlterado(campoAlterado);
                            }}
                        />
                    </fieldset>

                    <Botao
                        texto={"Salvar Alteração"}
                        modo={"contained"}
                        tipo={"submit"}
                        cor={"primary"}
                        largura={200}
                        fonteTamanho={16}
                        desabilitado={!campoAlterado || esperar}
                    />
                </form>
            </Container>

            {mensagem && (
                <Dialogo
                    aberto={mensagem}
                    aoCancelar={() => {
                        alterarMensagem(false);
                        irPara_listar_objetos(objetoTrabalhado);
                    }}
                    titulo={"Sucesso!"}
                    subtitulo={"Objeto alterado com sucesso!"}
                    temBotaoCancelar
                    rotuloCancelar={"Voltar"}
                />
            )}
        </FormProvider>
    );
}

import { FormProvider } from "react-hook-form";
import { Container } from "@mui/material";
import useCadastroDeObjeto from "@/logica/ganchos/parciais/useCadastroDeObjeto";
import { FormularioObjeto } from "../../componentes/entradas/Formularios/Formularios";
import TituloPagina from "../../componentes/exibe-dados/TituloPagina/TituloPagina";
import Botao from "../../componentes/entradas/Botao/Botao";
import Dialogo from "../../componentes/retorno/Dialogo/Dialogo";
import { conjuntoDeCampo } from "@/logica/tipos/globais";
import { ObjetoInterface } from "@/logica/interfaces/interfaces";

interface AdicionarObjetoProps {
    irPara_listar_objetos: (objeto: ObjetoInterface) => void;
}

export default function AdicionarObjeto({ irPara_listar_objetos }: AdicionarObjetoProps) {
    const {
            formularioMetodosCadastroObjeto,
            cadastrarObjeto,
            mensagem,
            alterarMensagem,
            imagemFile,
            alterarImagemFile,
            objetoTrabalhado,
            alterarObjetoTrabalhado,
            campoAlterado,
            alterarCampoAlterado,
            esperar,
        } = useCadastroDeObjeto(),
        { handleSubmit } = formularioMetodosCadastroObjeto;

    return (
        <FormProvider {...formularioMetodosCadastroObjeto}>
            <Container>
                <TituloPagina
                    titulo={"Adicionar novo objeto"}
                    subtitulo={"Preencha os dados do objeto que deseja adicionar"}
                />
                <form
                    onSubmit={handleSubmit(async () => {
                        alterarObjetoTrabalhado(
                            (await cadastrarObjeto(
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
                            novoCadastro
                            imagemFileObjeto={(imagemFile) => alterarImagemFile(imagemFile)}
                            qualquerCampoAlterado={(campoObjetoAlterado) => {
                                alterarCampoAlterado(campoObjetoAlterado);
                            }}
                        />
                    </fieldset>

                    <Botao
                        texto={"Cadastrar"}
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
                    titulo={"Sucesso!"}
                    subtitulo={"Cadastro do objeto realizado com sucesso!"}
                    temBotaoCancelar
                    rotuloCancelar={"Voltar"}
                    aoCancelar={() => {
                        alterarMensagem(false);
                        irPara_listar_objetos(objetoTrabalhado);
                    }}
                />
            )}
        </FormProvider>
    );
}

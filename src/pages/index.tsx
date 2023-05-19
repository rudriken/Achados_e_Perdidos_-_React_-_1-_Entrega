import { Container } from "@mui/material";
import TituloPagina from "@/visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import Cabecalho from "@/visual/componentes/superficies/Cabecalho/Cabecalho";
import { CampoDeTexto } from "@/visual/componentes/entradas/CampoDeTexto/CampoDeTexto.style";
import Botao from "@/visual/componentes/entradas/Botao/Botao";
import { useForm } from "react-hook-form";
import { FrontLocalInterface } from "@/logica/interfaces/FrontInterfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServicoEstruturaFormulario } from "@/logica/servicos/ServicoEstruturaFormulario";

export default function Inicial() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FrontLocalInterface>({
        resolver: yupResolver(ServicoEstruturaFormulario.buscaLocal()),
    });

    function formularioSubmetido(dados: FrontLocalInterface) {
        console.log(dados);
    }

    return (
        <>
            <Cabecalho imagem={"img/logos/logo.svg"} botao={"Cadastrar um local"} />
            <Container
                style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}
            >
                <form onSubmit={handleSubmit(formularioSubmetido)}>
                    <TituloPagina
                        titulo={"Perdeu um objeto?"}
                        subtitulo={
                            "Veja se o local onde perdeu seu objeto já está cadastrado na nossa plataforma"
                        }
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <CampoDeTexto
                            {...register("nome")}
                            placeholder={"Digite o nome do local"}
                            style={{ width: "550px" }}
                            error={errors?.nome !== undefined}
                            helperText={errors?.nome?.message}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Botao
                            texto={"Buscar"}
                            modo={"contained"}
                            tipo="submit"
                            margem={32}
                        />
                    </div>
                </form>
            </Container>
        </>
    );
}

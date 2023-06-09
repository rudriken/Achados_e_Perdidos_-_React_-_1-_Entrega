import { useState } from "react";
import { Skeleton } from "@mui/material";
import {
    CabecalhoConteiner,
    CabecalhoLogo,
    CabecalhoLink,
    CabecalhoBotao,
} from "./Cabecalho.style";
import Cardapio from "../../navegacao/Cardapio/Cardapio";
import Botao from "../../entradas/Botao/Botao";

interface CabecalhoProps {
    usuario?: string;
    imagem: string;
    link?: string;
    linkIrPara?: () => void;
    botao?: string;
    botaoIrPara?: string;
    cardapio?: string[];
    aoClicarNoItem?: (opcoes: string[], indice: number) => void;
}

export default function Cabecalho({
    usuario,
    imagem,
    link,
    linkIrPara,
    botao,
    botaoIrPara,
    cardapio,
    aoClicarNoItem,
}: CabecalhoProps): JSX.Element {
    const [abrirMenu, alterarAbrirMenu] = useState(false);
    return (
        <CabecalhoConteiner>
            <a href={"/"}>
                <CabecalhoLogo src={imagem} alt={"Achados e Perdidos"} />
            </a>
            <CabecalhoLink>
                {link ? <Botao texto={link} aoClicar={linkIrPara} /> : <div></div>}
            </CabecalhoLink>
            <CabecalhoBotao>
                {botao ? (
                    <Botao
                        modo={"contained"}
                        cor={"primary"}
                        texto={botao}
                        largura={250}
                        irPara={botaoIrPara}
                    />
                ) : cardapio ? null : (
                    <div></div>
                )}
                {cardapio && usuario && (
                    <Cardapio
                        usuario={usuario}
                        abrir={abrirMenu}
                        opcoes={cardapio}
                        quandoClicar={() => alterarAbrirMenu(true)}
                        quandoMenuAberto={() => alterarAbrirMenu(false)}
                        quandoFecharMenu={() => alterarAbrirMenu(false)}
                        quandoClicarNoItem={(indice) => aoClicarNoItem?.(cardapio, indice)}
                    />
                )}
                {!usuario && !botao && cardapio && (
                    <Skeleton
                        variant={"rectangular"}
                        width={300}
                        height={50}
                        animation={"wave"}
                    />
                )}
            </CabecalhoBotao>
        </CabecalhoConteiner>
    );
}

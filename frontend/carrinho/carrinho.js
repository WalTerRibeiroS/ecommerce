import { verificarUsuarioLogado } from "../header/adicaoLogado.js"
import { iniciarBarraPesquisa } from "../header/header.js";
import { renderizarLayout } from "./criarLayout.js";

renderizarLayout()
iniciarBarraPesquisa()
verificarUsuarioLogado()
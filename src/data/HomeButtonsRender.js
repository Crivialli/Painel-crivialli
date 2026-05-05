// src/data/menu.js
import { BsPhone, BsHeadset, BsBrowserChrome, BsCalendar2Check  } from "react-icons/bs";

export const buttons = [
  {
    title: "Plataformas",
    icon: BsPhone,
    type: "popup",
    items: [
      { name: "Faturamento", url: "/setor/faturamento", img: "/Img/Interface/FatLogo.png", external: false },
      { name: "RH", url: "/setor/rh", img: "/Img/Interface/RhLogo.png", external: false },
      { name: "Contabilidade", url: "/setor/contabilidade", img: "/Img/Interface/ContabilidadeLogo.png", external: false },
      { name: "Compras", url: "/setor/compras", img: "/Img/Interface/ComprasLogo.png", external: false },
      { name: "Financeiro", url: "/setor/financeiro", img: "/Img/Interface/FinanceiroLogo.png", external: false },
      { name: "PCP", url: "/setor/pcp", img: "/Img/Interface/PcpLogo.png", external: false },
      { name: "AR", url: "/setor/assuntos-regulatorios", img: "/Img/Interface/ArLogo.png", external: false },
      { name: "Sesmt", url: "/setor/sesmt", img: "/Img/Interface/SesmtLogo.png", external: false },
      { name: "Ti", url: "/setor/ti", img: "/Img/Interface/TiLogo.png", external: false },
    ],
  },
  {
    title: "Chamados",
    icon: BsHeadset,
    type: "popup",
    items: [
      { name: "Pagamentos", url: "https://login.sankhya.com.br/?brand_id=360003747033&return_to=https%3A%2F%2Fajuda.sankhya.com.br%2Frequests%2Fnew&timestamp=1758811092", img: "/Img/Interface/SankhyaLogo.png", external: true },
      { name: "Fusion", url: "https://nstechembarcador.movidesk.com/Account/Login?ReturnUrl=%2f", img: "/Img/Interface/FusionLogo.png", external: true },
      { name: "GLPI", url: "http://192.168.0.76/front/central.php", img: "/Img/Interface/logo-GLPI-100-white.png", external: true },
      { name: "Ramais", url: "/ramais", img: "/Img/Interface/Ramais.png", external: false },
    ],
  },
  {
    title: "Sites Oficiais",
    icon: BsBrowserChrome,
    type: "popup",
    items: [
      { name: "Crivialli", img: "/Img/Interface/CrivLogo.png", url: "https://www.crivialli.com.br", external: true },
      { name: "H2O", img: "/Img/Interface/H2oLogo.png", url: "https://h2oevolution.com.br/", external: true },
    ],
  },
  {
    title: "Reservas",
    icon: BsCalendar2Check,
    external: true,
    type: "link",
    url: "http://192.168.20.75:3000/",
  },
];
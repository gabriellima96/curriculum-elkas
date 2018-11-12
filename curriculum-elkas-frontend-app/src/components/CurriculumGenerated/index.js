import React from "react";
import "./styles.css";

const CurriculumGenerated = curriculum => (
  <div className="container">
    <div className="row backgroundCurriculo">
      <div className="col s12 backgroundCurriculo">
        <div className="col s5 painelPerfil z-depth-4">
          <div className="row perfil center-align ">
            <img className="circulo" src={require("../../images/icon7.png")} />
          </div>
          <div className="row center-align ">
            <h5 className="nameUser">Filipe Esteves do Rego</h5>
            <h6 className="dataUser">25/08/1998</h6>
          </div>
          <div className="row contactBar center-align">
            <div className="col s12">
              <h5 className="contactDiv">
                <img src={require("../../images/icon4.png")} width="30" />
                &nbsp;&nbsp;CONTATOS
              </h5>
            </div>
          </div>
          <div className="row rei">
            <div className="container">
              <div className="col s12 contactsBar">
                <h5 className="emailUser">
                  <img src={require("../../images/icon3.png")} width="22" />
                  &nbsp;&nbsp;filipe.esteves08@gmail.com
                </h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <div className="col s12 contactsBar">
                <h5 className="emailUser">
                  <img src={require("../../images/icon3.png")} width="22" />
                  &nbsp;&nbsp;braz.lipe.15@hotmail.com
                </h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <div className="col s12 contactsBar">
                <h5 className="emailUser">
                  <img src={require("../../images/icon5.png")} width="22" />
                  &nbsp;&nbsp;82999441387
                </h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <div className="col s12 contactsBar">
                <h5 className="emailUser">
                  <img src={require("../../images/icon2.png")} width="22" />
                  &nbsp;&nbsp;publicArea, district, &nbsp;&nbsp;postalCode,
                  city, state, &nbsp;&nbsp;country
                </h5>
              </div>
            </div>
          </div>
          <div className="row contactBar center-align">
            <div className="col s12">
              <h5 className="contactDiv">
                <img src={require("../../images/icon1.png")} width="35" />
                &nbsp;&nbsp;OBJETIVOS
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <div className="col s12">
                <p className="objetiveText center-align">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt.
                </p>
              </div>
            </div>
          </div>
          <div className="row contactBar center-align">
            <div className="col s12">
              <h5 className="contactDiv">
                <img src={require("../../images/icon6.png")} width="35" />
                &nbsp;&nbsp;IDIOMAS
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <div className="col s6">
                <h5 className="idioma">LÍNGUA</h5>
                <p className="objetiveText">Português</p>
                <p className="objetiveText">Espanhol</p>
                <p className="objetiveText">Inglês</p>
              </div>
              <div className="col s6">
                <h5 className="idioma">FLUÊNCIA</h5>
                <p className="objetiveText">Nativo</p>
                <p className="objetiveText">Intermediário</p>
                <p className="objetiveText">Básico</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col s7">
          <div className="row">
            <div className="painelFormacao right-align z-depth-3">FORMAÇÃO</div>
          </div>
          <div className="row">
            <div className="col s12 painelFormacoes right-align">
              <div className="row">
                <div className="col s6 left-align">
                  <h5 className="dateFormacao">2018</h5>
                </div>
                <div className="col s6 right-align">
                  <h5 className="dateFormacao">atual</h5>
                </div>
              </div>
              <div className="row">
                <div className="col s12 right-align">
                  <h5 className="instituteFormacao">
                    Instituto Federal de Alagoas
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col s12 right-align">
                  <h5 className="curseFormacao">Sistemas de Informação</h5>
                </div>
              </div>
              <div className="row">
                <div className="col s12 right-align">
                  <h5 className="curseFormacao blue-text">Bacharelado</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12 painelFormacoes right-align">
              <div className="row">
                <div className="col s6 left-align">
                  <h5 className="dateFormacao">2016</h5>
                </div>
                <div className="col s6 right-align">
                  <h5 className="dateFormacao">2018</h5>
                </div>
              </div>
              <div className="row">
                <div className="col s12 right-align">
                  <h5 className="instituteFormacao">
                    Universidade Federal de Alagoas
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col s12 right-align">
                  <h5 className="curseFormacao">Ciências da Computação</h5>
                </div>
              </div>
              <div className="row">
                <div className="col s12 right-align">
                  <h5 className="curseFormacao blue-text">Graduação</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="painelFormacao right-align z-depth-3">
              EXPERIÊNCIAS
            </div>
          </div>
          <div className="row">
            <div className="col s12 painelFormacoes right-align">
              <div className="row">
                <div className="col s12 right-align">
                  <h5 className="dateFormacao">Empresa</h5>
                </div>
              </div>
              <div className="row">
                <div className="col s12 right-align">
                  <h5 className="officeEx orange-text">CARGO</h5>
                </div>
              </div>
              <div className="row">
                <div className="col s12 right-align">
                  <h5 className="instituteFormacao">Localização</h5>
                </div>
              </div>
              <div className="row">
                <div className="col s12 right-align">
                  <h5 className="instituteFormacao">INÍCIO - TÉRMINO</h5>
                </div>
              </div>
              <div className="row">
                <div className="col s12 left-align">
                  <p className="descEx">
                    Descrição: It is a long established fact that a reader will
                    be distracted by the readable content of a page when looking
                    at its layout.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row contactBar center-align z-depth-4">
            <div className="col s12">
              <h5 className="contactDiv">
                <img src={require("../../images/icon8.png")} width="35" />
                &nbsp;&nbsp;HABILIDADES
              </h5>
            </div>
            <div className="col s12 painelPerfil">
              <div className="col s3">
                <h5 className="idioma">habilidade</h5>
              </div>
              <div className="col s3">
                <h5 className="idioma">habilidade</h5>
              </div>
              <div className="col s3">
                <h5 className="idioma">habilidade</h5>
              </div>
              <div className="col s3">
                <h5 className="idioma">habilidade</h5>
              </div>
              <div className="col s3">
                <h5 className="idioma">habilidade</h5>
              </div>
              <div className="col s3">
                <h5 className="idioma">habilidade</h5>
              </div>
              <div className="col s3">
                <h5 className="idioma">habilidade</h5>
              </div>
              <div className="col s3">
                <h5 className="idioma">habilidade</h5>
              </div>
              <div className="col s3">
                <h5 className="idioma">habilidade</h5>
              </div>
              <div className="col s3">
                <h5 className="idioma">habilidade</h5>
              </div>
              <div className="col s3">
                <h5 className="idioma">habilidade</h5>
              </div>
              <div className="col s3">
                <h5 className="idioma">habilidade</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default CurriculumGenerated;

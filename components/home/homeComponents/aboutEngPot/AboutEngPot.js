import React, { useState } from "react";
import styles from "./AboutEngPot.module.css";

import Button from "../../../ui/components/button/Button";

function AboutEngPot(props) {
  const [activeLanguage, setActiveLanguage] = useState("eng");

  const { aboutEngPotRef } = props;

  const bodyEng = (
    <div>
      <div>
        Engpot English is a platform that aims to help people learn and teach
        English in a smoother way.
      </div>
      <br />
      <br />
      <div>
        Many other platforms outside focus on the learner side of this
        challenging journey of obtaining the necessary skills to land a
        well-deserved job. EngPot English is going to help not only the
        students, unlike others, but also the ESL teachers.
        <br />
        As a self-taught web developer, I am doing my best to provide you the
        state-of-art technologies that are integrated various games and
        activities. Please be patient on this journey, and please do note that
        learning anything is mostly up to you. A tutor is only able to enhance
        the experience of learning, and the joy of it.
      </div>
      <br />
      <br />
      <div>
        If you have any questions, or if you have any comments to deliver to my
        person, there is no point in hesitating : )
      </div>
      <div>
        A little side note: I am currently preparing a users handbook, real
        soon, you will not get confused as much as you do right now. See you
        around folk!
      </div>
    </div>
  );

  const bodyTr = (
    <div>
      <div>
        Engpot English bizlerin İngilizce dilini daha kolay öğrenmemizi ve daha
        kolay öğretmemizi sağlamak amacında olan online bir platformdur.
      </div>
      <br />
      <br />
      <div>
        Günümüzde sahip olduğumuz birçok platform iyi bir iş elde etmek için
        ihtiyacımız olan çok değerli bir yeteneği öğrenme aşamasının yalnızca
        öğrenen kişiler tarafına odaklanıyorlar.
        <br />
        <br />
        EngPot English ise yalnızca öğrenen taraf değil öğreten tarafın da işini
        kolaylaştıracak.
        <br />
        Kendi kendine yazılım ve programlama öğrenmiş birisi olarak, sizlere en
        güncel ve en yeni teknolojileri kullanarak çeşitli oyun ve aktiviteler
        sunmak için elimden gelenin en iyisini yapmak için çabalıyorum. Bu
        yolculukta beni sabırla beklediğiniz için teşekkür ederim.
        <br />
        Ayrıca kulağımıza küpe etmemiz gereken şeyin şu olduğunu söylemek
        isterim ki, eğitim öğretmen/eğitmen ile ilgili olduğundan çok daha fazla
        öğrencinin kendisi ile ilgilidir. Bir öğretmen/eğitmen yalnızca öğrenme
        sürekliliğimizi ve bundan aldığımız zevki artırabilir.
      </div>
      <br />
      <br />
      <div>
        Eğer bir sorunuz olursa, ya da bana söylemek istediğiniz herhangi bir
        şey olursa, çekinmenin ne size ne bana faydası var : )
      </div>
      <div>
        Küçük bir not: Şuanda kullanıcı kılavuzu hazırlıyorum, pek yakında
        sizlerle yaplaşırım diye düşünmekteyim. EngPot English ten çok daha
        fazla yararlanabileceksiniz. Adios amigos!
      </div>
    </div>
  );

  return (
    <div className={styles["about-engpot"]} ref={aboutEngPotRef}>
      <div className={styles["title"]}>
        What is <span>EngPot English</span>?
      </div>
      <div className={`${styles["body"]} card highlight--dark`}>
        <div className={styles["language-toggler"]}>
          <Button
            type="button"
            classes={activeLanguage === "eng" ? null : "button--white"}
            onClick={setActiveLanguage.bind(null, "eng")}
            text="eng"
          />
          <Button
            type="button"
            classes={activeLanguage === "tr" ? null : "button--white"}
            onClick={setActiveLanguage.bind(null, "tr")}
            text="tr"
          />
        </div>
        {activeLanguage === "eng" && bodyEng}
        {activeLanguage === "tr" && bodyTr}
      </div>
      <a target={"_blank"} href="https://github.com/ssoydabas" rel="noreferrer">
        <Button classes="button--white" type="button" text="Visit Github" />
      </a>
    </div>
  );
}

export default AboutEngPot;

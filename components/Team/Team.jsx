import Image from "next/image";
import styles from "./Team.module.css";
import { TeamInfo } from "./constants";

const Team = () => {
  return (
    <section id="team" className={`${styles.teamContainer}`}>
      <h2 className={`${styles.title}`}>TEAM</h2>
      <div className={`${styles.gridContainer}`}>
        {TeamInfo.map((member, index) => (
          <div key={index} className={`${styles.memberContainer} ${index === 0 ? styles.firstMember : ""} ${index === 2 ? styles.lastMember : ""}`}>
            <Image src={member.image} width={300} height={100} alt="team" className={`${styles.image}`} />
            <div className={`${styles.textContainer}`}>
              <h2 className={`${styles.memberName}`}>{member.name}</h2>
              <h3 className={`${styles.memberRole}`}>{member.role}</h3>
              <p className={styles.memberBio}>{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;

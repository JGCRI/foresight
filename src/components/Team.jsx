import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import team_chris from "../assets/img/team_chris.png";
import team_mengqi from "../assets/img/team_mengqi.jpg";
import team_taryn from "../assets/img/team_taryn.png";
import team_hassan from "../assets/img/team_hassan.jpg";
import team_benjamin from "../assets/img/team_benjamin.jpg";
import './css/Team.css';

const teamMembers = [
  {
    name: "Chris Vernon",
    position: "Data Scientist",
    photo: team_chris,
    email: "chris.vernon@pnnl.gov"
  },
  {
    name: "Mengqi Zhao",
    position: "Earth Scientist",
    photo: team_mengqi,
    email: "mengqi.zhao@pnnl.gov"
  },
  {
    name: "Taryn Waite",
    position: "Earth Scientist",
    photo: team_taryn,
    email: "tayrn.waite@pnnl.gov"
  },
  {
    name: "Hassan Niazi",
    position: "Post Masters Research Associate",
    photo: team_hassan,
    email: "hassan.niazi@pnnl.gov"
  },
  {
    name: "Benjamin Knight",
    position: "Software Intern",
    photo: team_benjamin,
    email: "benjamin.knight@pnnl.gov"
  },  
];

const Team = () => {
  return (
    <div className="body-page teams-page">
      <Container>
        <Row>
        <h1 className="page-title">Our Team</h1>
        <hr className="home-hr" />
          <div className="page-subtitle">
            The models and data used by Foresight are produced by our full team of scientists at the Joint Global Change Research Institute <a href="https://www.pnnl.gov/projects/jgcri" target="_blank" rel="noreferrer">(JGCRI)</a>. Key contributors to the Foresight dashboard are listed below. 
          </div>
        </Row>
        <hr className="home-hr lower-hr" />
        <div className="page-text">
        <Row className="justify-content-around">
          {teamMembers.map((member, index) => (
            <Col key={index} xs={12} sm={12} md={12} lg={4} className="team-member">
              {member.link ? (
                  <a href={member.link} target="_blank" rel="noreferrer">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      roundedCircle
                    />
                  </a>
                ) : (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    roundedCircle
                  />
                )}
              <h3 className="mt-3 team-member-name">{member.name}</h3>
              <p>{member.position}</p>
              <p><a href={`mailto:${member.email}`}>{member.email}</a></p>
            </Col>
          ))}
        </Row>
        </div>
        <hr className="home-hr lower-hr" />
      </Container>
    </div>
  );
};

export default Team;

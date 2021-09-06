import SubjectItem from "./SubjectItem";
import classes from "./SubjectList.module.css";

function SubjectList(props) {
  return (
    <ul className={classes.list}>
      {props.subjects.map((subject) => (
        <SubjectItem key={subject.id} id={subject.id} title={subject.title}/>
      ))}
    </ul>
  );
}

export default SubjectList;

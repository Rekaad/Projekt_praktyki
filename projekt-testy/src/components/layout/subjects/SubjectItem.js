import { Link } from "react-router-dom";

import Card from '../ui/Card';
import classes from './SubjectItem.module.css';

function SubjectItem(props){

    return <li className={classes.item}>
    <Card>
        <div className={classes.content}>
        <Link to={props.title}> <h3> {props.title} </h3>  </Link> 
        </div>
        </Card>
    </li>

}

export default SubjectItem;
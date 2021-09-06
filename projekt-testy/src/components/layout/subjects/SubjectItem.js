import Card from '../ui/Card';
import classes from './SubjectItem.module.css';

function SubjectItem(props){

    return <li className={classes.item}>
    <Card>
        <div className={classes.content}>
            <h3> {props.title} </h3>
        </div>
        </Card>
    </li>

}

export default SubjectItem;
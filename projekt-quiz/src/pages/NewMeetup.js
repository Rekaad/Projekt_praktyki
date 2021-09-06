import { useHistory, useEffect } from "react-router-dom";
import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupsPage() {
    const history = useHistory();
    const a = 'meetuptest';
    function addMeetUpHandler(meetupData){
        fetch('https://react-poczatek-default-rtdb.europe-west1.firebasedatabase.app/'+a+'/test.json',
        {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then(() => {
            history.replace('/');
        });
    }
    return <section>
    
        <h1>Add new meetup</h1>
        <NewMeetupForm onAddMeetup={addMeetUpHandler}/>
    </section>

}

export default NewMeetupsPage;
import SubjectList from "../components/layout/subjects/SubjectList";

const DUMMY_DATA = [
  {
    id: "1",
    title: "Matematyka",
  },
  {
    id: "2",
    title: "Przyroda",
  },
  {
    id: "3",
    title: "Chemia",
  },
  {
    id: "4",
    title: "Fizyka",
  },
];

function AllTests() {
  return (
    <section>
      <h1> All Tests</h1>
      <SubjectList subjects={DUMMY_DATA}/>
    </section>
  );
}

export default AllTests;

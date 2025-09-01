import Content from './Content';
const Header = (props) => <h1>{props.course}</h1>;

const Course = ({ course }) => {
	console.log({ course });

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
		</div>
	);
};

export default Course;

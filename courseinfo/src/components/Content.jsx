const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Total = ({ parts }) => {
	const totalExercises = parts.map((part) => part.exercises);
	console.log('exercises', totalExercises);

	const total = totalExercises.reduce((acc, num) => acc + num, 0);
	console.log('sum', total);

	return <b>Total of {total} exercises</b>;
};

const Content = ({ parts }) => (
	<div>
		{parts.map((part) => (
			<Part key={part.id} part={part} />
		))}

		<Total parts={parts} />
	</div>
);

export default Content;

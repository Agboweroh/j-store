import CategoryItem from "../category-item/category-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
	return (
		<div className='directory-container'>
			{categories.map((category) => (
				<CategoryItem key={category.id} category={category} />
			))}
		</div>
	);
};

export default Directory;

// yarn.lock or package.json.lock files ensure that all the libraries are locked to same versions to avoid issues such as conflicts

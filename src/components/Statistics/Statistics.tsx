import {CategoriesObject} from "../../features/notes/Notes";

type TableProps = {
  statistics: CategoriesObject
};

const Statistics = ({ statistics }: TableProps) => {
   const { task, idea, thought } = statistics;
    return (
        <div className="table-wrapper">
            <div className="table-header categories-header">
                <div>Note category</div>
                <div>Active</div>
                <div>Archived</div>
            </div>
        <ul id={'categories'}>
            <li>
                <div>
                    Tasks
                </div>
                <div>{task.unArchived}</div>
                <div>{task.archived}</div>
            </li>
            <li>
                <div>
                    Ideas
                </div>
                <div>{idea.unArchived}</div>
                <div>{idea.archived}</div>
            </li>
            <li>
                <div>
                    Random thought
                </div>
                <div>{thought.unArchived}</div>
                <div>{thought.archived}</div>
            </li>
        </ul>
        </div>
    )
};

export default Statistics;

import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import {
    createTask,
    editCompleteStatusParagraph,
    getTasks,
    removeTask,
    changeTask,
} from "../store/tasks";
/* import Loader from "../components/common/icon/loader"
import { getIsLoggedIn } from "./../store/users" */

const TaskContext = React.createContext();

export const useTask = () => {
    return useContext(TaskContext);
};

const TaskProvider = ({ children }) => {
    const dispatch = useDispatch();
    /* const isLoggedIn = useSelector(getIsLoggedIn())
    const isLoading = useSelector(getNotesLoadingStatus())
    const loadNotes = () => dispatch(loadNotesList())
    useEffect(() => {
        if (isLoggedIn) {
            loadNotes()
        }
    }, [isLoggedIn]) */

    /* <--------------------------------Constant--------------------------------> */

    /* базовый массив для фильтрации по категориям */
    const categoriesArray = [
        {
            category: "Critical",
            color: "btn-danger",
            taskList: [],
        },
        {
            category: "To do",
            color: "btn-info",
            taskList: [],
        },
        {
            category: "In progress",
            color: "btn-primary",
            taskList: [],
        },
        {
            category: "Done",
            color: "btn-success",
            taskList: [],
        },
    ];
    const colorList = [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
    ];

    /* <--------------------------------Local State--------------------------------> */

    /* стейт отфильтрованных task который мы передаем дальше */
    const [filteredTasksByCategories, setfilteredTasksByCategories] = useState(
        []
    );
    /* стейт для указания активной категории которая будет раскрыта */
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(1);

    /* <----------------MODAL for create task----------------> */
    /* активация модального окна для создания task */
    const [activeModal, setActiveModal] = useState(false);
    /* редактирование title в модальном окне для создания task */
    const [modalTitle, setModalTitle] = useState("");
    /* редактирование paragraphs в модальном окне для создания task */
    const [modalParagraphs, setModalParagraphs] = useState([]);

    /* <----------------MODAL for edit task----------------> */

    const [activeEditModalTask, setActiveEditModalTask] = useState(false);
    const [editedTask, setEditedTask] = useState({});
    const [criticalStatus, setCriticalStatus] = useState(false);
    const [colorEditTask, setColorEditTask] = useState("primary");

    /* <----------------MODAL for remove task----------------> */

    const [activeConfirmRemoveTaskModal, setConfirmRemoveTaskModal] =
        useState(false);

    const [confirmTaskID, setConfirmTaskID] = useState();
    /* <--------------------------------FUNCTION--------------------------------> */

    /* <----------------MODAL for create task----------------> */
    /* открытия модального окна */
    const onActiveModal = (data, type = "") => {
        const title = data ? data.title : "";
        const paragraphs = data ? data.paragraphs : [];
        const color = data && data.color || "primary";
        data && setEditedTask(data);

        if (type === "edit") {
            setActiveEditModalTask(!activeEditModalTask);
            data && data.critical
                ? setCriticalStatus(data.critical)
                : setCriticalStatus(false);
        } else {
            setActiveModal(!activeModal);
        }

        setModalTitle(title);
        setModalParagraphs(paragraphs);
        setColorEditTask(color);
    };

    /* изменение title in modal */
    const changeModalTitle = (event) => {
        setModalTitle(event.target.value);
    };

    /* добавление параграфа в модальное окно */
    const onAddModalParagraph = () => {
        const newData = [...modalParagraphs];
        const newParagraph = {
            id: nanoid(),
            description: "",
            completed: false,
            user: "",
        };
        newData.push(newParagraph);
        setModalParagraphs(newData);
    };

    /* изменение checkbox параграфа */

    const onChangeModalCheckbox = (event, index) => {
        const newParagraphs = [...modalParagraphs]; // create a new array with the same objects
        newParagraphs[index].completed = event.target.checked; // update the description property of the object at the specified index
        setModalParagraphs(newParagraphs); // set the state with the new array
    };

    /* изменение описания параграфа */
    const onChangeModalParagraphDescription = (event, index) => {
        const newParagraphs = [...modalParagraphs]; // create a new array with the same objects
        newParagraphs[index].description = event.target.value; // update the description property of the object at the specified index
        setModalParagraphs(newParagraphs); // set the state with the new array
    };

    /* удаление параграфа из модального окна */
    const onDeleteModalParagraph = (index) => {
        const newParagraphs = [...modalParagraphs];
        newParagraphs.splice(index, 1);
        setModalParagraphs(newParagraphs);
    };

    /* <----------------MODAL for edit task----------------> */

    /* использует почти все функции модального окна для создание task */

    const editColor = (color = "danger") => {
        let activeColorIndex = colorList.findIndex((item) => item === color);
        if(activeColorIndex >= colorList.length - 1){
            activeColorIndex = 0
        } else {
            activeColorIndex++
        }
        setColorEditTask(colorList[activeColorIndex]);
    };

    const editCriticalStatus = () => {
        setCriticalStatus(!criticalStatus);
    };

    const editTask = () => {
        const data = {
            taskID: editedTask.taskID, //неизменяемый
            title: modalTitle,
            color: colorEditTask,
            paragraphs: modalParagraphs,
            createdAt: editedTask.createdAt, //неизменяемый
            user: editedTask.user, //неизменяемый
            critical: criticalStatus,
        };
        dispatch(changeTask(data));
        onActiveModal(null, "edit");
    };

    /* <----------------MODAL for remove task----------------> */

    const handleShowConfirmRemoveTaskModal = (data) => {
        setConfirmRemoveTaskModal(!activeConfirmRemoveTaskModal);
        setConfirmTaskID(data);
    };

    const handleConfirmRemoveTask = () => {
        onDeleteTask(confirmTaskID);
        setConfirmRemoveTaskModal(!activeConfirmRemoveTaskModal);
        setConfirmTaskID();
    };

    /* <----------------CATEGORY----------------> */

    /* разворачиванием по клику активной категории */
    const handleChangeActiveCategory = (index) => {
        setActiveCategoryIndex(index); // Устанавливаем активный индекс при клике на элемент
    };

    /* <----------------TASK----------------> */

    /* получения всех тасок по проекту */
    const taskList = useSelector(getTasks());

    /* фильтрация полученных tasks по категориям to do, critical, in progress, done */
    taskList.forEach((item) => {
        const completed = [];
        item.paragraphs.forEach((paragraph) => {
            completed.push(paragraph.completed);
        });
        if (completed.every((item) => item === true)) {
            categoriesArray
                .find((item) => item.category === "Done")
                .taskList.push(item);
        } else if (item.paragraphs.length === 0) {
            categoriesArray
                .find((item) => item.category === "To do")
                .taskList.push(item);
        } else if (item.critical) {
            categoriesArray
                .find((item) => item.category === "Critical")
                .taskList.push(item);
        } else if (completed.every((item) => item === false)) {
            categoriesArray
                .find((item) => item.category === "To do")
                .taskList.push(item);
        } else {
            categoriesArray
                .find((item) => item.category === "In progress")
                .taskList.push(item);
        }
    });

    /* сортировка по количеству параграфов */
    function sortParagraphsByCount(array) {
        array.forEach((item) => {
            item.taskList.sort((a, b) => {
                return a.paragraphs.length - b.paragraphs.length;
            });
        });
        return array;
    }

    /* передача в локальный стейт отфильтрованных tasks */
    useEffect(() => {
        const sorted = sortParagraphsByCount(categoriesArray);
        setfilteredTasksByCategories(sorted);
    }, [taskList]);

    /* удаление task */

    function onDeleteTask(id) {
        dispatch(removeTask(id));
    }

    /* создание task */
    function onCreateTask() {
        const data = {
            taskID: nanoid(),
            title: modalTitle,
            color: colorEditTask,
            paragraphs: modalParagraphs,
            createdAt: Date.now(),
            user: "",
        };
        dispatch(createTask(data));
        onActiveModal();
    }

    /* <----------------PARAGRAPH----------------> */

    /* изменение статуса complete в paragraph */
    const editCompleteStatus = (taskID, paragraphID) => {
        dispatch(editCompleteStatusParagraph(taskID, paragraphID));
    };

    return (
        <TaskContext.Provider
            value={{
                filteredTasksByCategories,
                activeCategoryIndex,
                handleChangeActiveCategory,
                editCompleteStatus,
                onDeleteTask,
                onCreateTask,
                onActiveModal,
                activeModal,
                changeModalTitle,
                modalTitle,
                modalParagraphs,
                onAddModalParagraph,
                onChangeModalParagraphDescription,
                onChangeModalCheckbox,
                onDeleteModalParagraph,
                activeEditModalTask,
                editTask,
                criticalStatus,
                editCriticalStatus,
                activeConfirmRemoveTaskModal,
                handleShowConfirmRemoveTaskModal,
                handleConfirmRemoveTask,
                colorEditTask,
                editColor,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

TaskProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default TaskProvider;

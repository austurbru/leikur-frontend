interface Props {
  color: string;
  courseNumber: number;
}

const CourseLabel = ({ color, courseNumber }: Props) => {
    const style = {
        color: `var(--${color})`,
        fontSize: "3em",
        borderRight: `3px solid var(--${color})`,
        height: "100%",
        display: "flex",
        alignItems: "center",
        paddingRight: "2rem",

    }
    return <div style={style}>{courseNumber}</div>;
};

export default CourseLabel;


const createMetaDataHandler = () => {
    let metaData = {};


    const getMetaData = () => {
        console.log("Текущие метаданные:", metaData);
        return metaData;
    };


    const createMetaData = (project_name ) => {
        let verion = "1.0.0"
        metaData =  {
            created_by: "Admin",
            edited_by: null,
            project_status: "created",
            project_version: verion,
            creation_date: new Date().toISOString().split('T')[0],
            project_name: project_name + "-" + verion,
            distribution_type_conducted: null
        };
        console.log("Метаданные созданы:", metaData);
    };

    const updateMetaData = (updatedFields) => {
        metaData = { ...metaData, ...updatedFields };
        console.log("Метаданные обновлены:", metaData);
    };

    return {
        getMetaData,
        createMetaData,
        updateMetaData
    };
};

export default createMetaDataHandler;

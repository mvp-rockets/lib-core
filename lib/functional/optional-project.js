const optionalProject = (_, project) => {
    return _.coalesce(
        project,
        _.constant({})
    )
}
module.exports = optionalProject;
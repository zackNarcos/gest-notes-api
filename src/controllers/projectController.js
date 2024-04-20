'use strict';
const Project = require('../models/projectModel')

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { projectValidation } = require("../middleware/validation");
const {unlinkSync} = require("fs");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    return res.status(200).send(
        projects
    )
  } catch (err) {
    return res.status(400).send({error: err});
  }
}

exports.getProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (project) {
        return res.status(200).send(project);
        } else {
        return res.status(404).send({ message: "Project not found" });
        }
    } catch (err) {
        return res.status(400).send({ error: err });
    }
}


exports.add = async (req, res) => {
  const { error, value } = projectValidation(req.body);
  if (error) return res.status(400).send(error);

  try {
    const newProject = await createPaysObj(req);
    const savedProject = await Project.create(newProject);
    return res.status(200).send({ message: "Project created successfully!", pays: savedProject });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
};

// Update Pays
exports.updateProject = async (req, res) => {
  try {

    const idNumber = parseInt(req.params.id);
    console.log('req.body', req.body)

    let project = await createPaysObj(req);


    console.log('project', project)
    const updatedProject = await Project.update(project, {
        where: { id: idNumber }
        });

    if (updatedProject[0] === 1) {
      const updatedRecord = await Project.findByPk(req.params.id);
      return res.status(200).send(updatedRecord);
    } else {
      return res.status(404).send({ message: "Project not found or not updated" });
    }
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to update Project" });
  }
};

// Delete Pays
exports.deleteProject = async (req, res) => {
  try {
    const idNumber = parseInt(req.params.id);
    const deletedProject = await Project.destroy({
      where: { id: idNumber }
    });

    if (deletedProject === 1) {
      const project = await Project.findByPk(req.params.id);
      const filename = project.image.split('/').pop();
        unlinkSync(`./public/uploads/${filename}`);
      return res.status(200).send({ message: "Project deleted successfully" });
    } else {
      return res.status(404).send({ message: "Project not found or not deleted" });
    }

  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to delete Project" });
  }
};

const createPaysObj = async (req) => {
  let url = req.protocol + '://' + req.get('host');
  let image;
  if (req.file) {
    image = req.file.filename;
  }
  let imageUrl = url + '/uploads/' + image;

  if (!req.file) {
    imageUrl = req.body.image;
  }

  let project = {
    title: req.body.title,
    link: req.body.link,
    image: imageUrl,
    technologies: req.body.technologies,
    description: req.body.description
  };
  if(imageUrl === undefined || imageUrl === null) {
    project = {
      title: req.body.title,
      link: req.body.link,
      technologies: req.body.technologies,
      description: req.body.description
    };
  }
  return project;
}

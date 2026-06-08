const { Note } = require('../models/note');

const getAllNotes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, tag, search = '' } = req.query;

    const pageNumber = Number(page);
    const perPageNumber = Number(perPage);
    const skip = (pageNumber - 1) * perPageNumber;

    let query = Note.find();

    if (tag) {
      query = query.where('tag').equals(tag);
    }

    if (search) {
      query = query.or([
        { title: new RegExp(search, 'i') },
        { content: new RegExp(search, 'i') },
      ]);
    }

    const totalNotes = await Note.countDocuments();

    const notes = await query.skip(skip).limit(perPageNumber);

    const totalPages = Math.ceil(totalNotes / perPageNumber);

    res.status(200).json({
      page: pageNumber,
      perPage: perPageNumber,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllNotes };

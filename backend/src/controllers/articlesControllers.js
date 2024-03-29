/* eslint-disable camelcase */
const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const allArticles = await tables.articles.readAll();
    res.json(allArticles);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await tables.articles.read(id);
    if (article == null) {
      res.sendStatus(404);
    } else {
      res.json(article);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const auteur_id = req.user.id;
  const article = {
    titre: req.body.titre,
    contenu: req.body.contenu,
    auteur_id,
    image_url: req.file ? `/uploads/${req.file.filename}` : "",
  };
  try {
    const insertId = await tables.articles.create(article);
    res.status(201).json({ insertId, imageUrl: article.image_url });
  } catch (err) {
    next(err);
  }
};

const browseLastFiveWithAuthor = async (req, res, next) => {
  try {
    const lastFiveArticleswithAuthor =
      await tables.articles.lastFiveWithAuthor();
    res.json(lastFiveArticleswithAuthor);
  } catch (err) {
    next(err);
  }
};

const browseWithAuthors = async (req, res, next) => {
  try {
    const allArticlesWithAuthors = await tables.articles.readAllWithAuthor();
    res.json(allArticlesWithAuthors);
  } catch (err) {
    next(err);
  }
};

const readWithAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await tables.articles.readWithAuthor(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    return res.json(article);
  } catch (err) {
    next(err);
  }
};

const browseAllUnapprovedForAdmin = async (_, res, next) => {
  try {
    const unapprovedArticles = await tables.articles.readAllUnapproved();
    res.json(unapprovedArticles);
  } catch (err) {
    next(err);
  }
};

const approveArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await tables.articles.approveArticle(id);
    if (success) {
      res.status(200).json({ message: "Article approuvé avec succès" });
    } else {
      res.status(404).json({ message: "Article non trouvé" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'approbation de l'article" });
    next(error);
  }
};

// J'ai conscience de la redondance de cette fonction avec read mais je la garde pour l'instant pour des raisons de clarté
const readOneArticleToApprove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await tables.articles.read(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    return res.json(article);
  } catch (err) {
    next(err);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const successDelete = await tables.articles.deleteArticle(id);
    if (successDelete) {
      res.status(200).json({ message: "Article supprimé avec succès" });
    } else {
      res.status(404).json({ message: "Article non trouvé" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'article" });
    next(error);
  }
};

module.exports = {
  browse,
  read,
  add,
  browseLastFiveWithAuthor,
  browseWithAuthors,
  readWithAuthor,
  browseAllUnapprovedForAdmin,
  approveArticle,
  readOneArticleToApprove,
  deleteArticle,
};

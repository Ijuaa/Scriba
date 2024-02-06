const express = require("express");

const router = express.Router();
/* const verifyAdmin = require("./middlewares/verifyAdmin"); */
const uploadFile = require("./middlewares/multer");
const jwtMiddleware = require("./middlewares/jwt");
const verifyAdmin = require("./middlewares/verifyAdmin");
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
/* const itemControllers = require("./controllers/itemControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);
 */
/* ************************************************************************* */

const articleControllers = require("./controllers/articlesControllers");

router.get("/articles", articleControllers.browseWithAuthors);
router.get("/articles/:id", articleControllers.readWithAuthor);
router.get("/articles-home", articleControllers.browseLastFiveWithAuthor);
router.post(
  "/articles",
  jwtMiddleware,
  uploadFile.single("image"),
  articleControllers.add
);

// ------ endpoints Admin ------

router.get(
  "/admin/articles",
  jwtMiddleware,
  verifyAdmin,
  articleControllers.browseAllUnapprovedForAdmin
);

router.get(
  "/admin/articles/:id/approve",
  jwtMiddleware,
  verifyAdmin,
  articleControllers.approveArticle
);

/* router.delete(
  "/admin/articles/:id/delete",
  jwtMiddleware,
  verifyAdmin,
  articleControllers.deleteArticle
); */ // a vérifier

router.get(
  "/admin/articles/:id",
  jwtMiddleware,
  verifyAdmin,
  articleControllers.readOneArticleToApprove
);

router.patch(
  "/admin/articles/:id/approve",
  jwtMiddleware,
  verifyAdmin,
  articleControllers.approveArticle
);
/* ************************************************************************* */

const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.get("/users/pseudo/:pseudo", userControllers.userPseudoFinder);
router.post("/users", userControllers.add);

router.post("/login", userControllers.userLogin);
/* ************************************************************************* */
/* router.get("/admin", verifyAdmin, */ //  plus tard

module.exports = router;

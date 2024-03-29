const express = require("express");

const router = express.Router();
/* const verifyAdmin = require("./middlewares/verifyAdmin"); */
const uploadFile = require("./middlewares/multer");
const jwtMiddleware = require("./middlewares/jwt");
const verifyAdmin = require("./middlewares/verifyAdmin");
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// ------ endpoints Articles ------

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

// ------ endpoints Users ------

const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.get("/users/pseudo/:pseudo", userControllers.userPseudoFinder);
router.post("/users", userControllers.add);

router.post("/login", userControllers.userLogin);

// verify email
router.get("/verify/:token", userControllers.verifyEmail);

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

router.delete(
  "/admin/articles/:id/delete",
  jwtMiddleware,
  verifyAdmin,
  articleControllers.deleteArticle
);

/* ************************************************************************* */

module.exports = router;

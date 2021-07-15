const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    if (!err) {
      conn.query("SELECT * FROM productos", (err, productos) => {
        if (!err) {
          res.render("productos", {
            data: productos,
          });
        } else res.json(err);
      });
    } else res.json(err);
  });
};

controller.save = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query("INSERT INTO productos set ?", [data], (err, producto) => {
      res.redirect("/");
    });
  });
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM productos WHERE id = ?", id, (err, producto) => {
      res.render("producto-edit", { data: producto[0] });
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query(
      "UPDATE productos SET ? WHERE id = ?",
      [data, id],
      (err, producto) => {
        res.redirect("/");
      }
    );
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("DELETE FROM productos WHERE id = ?", id, (err, rows) => {
      res.redirect("/");
    });
  });
};

controller.show = (req, res) => {
    req.getConnection((err, conn) => {
        if (!err) {
          conn.query("SELECT * FROM productos", (err, productos) => {
            if (!err) {
              res.render("productos-client", {
                data: productos,
              });
            } else res.json(err);
          });
        } else res.json(err);
      });
};
module.exports = controller;

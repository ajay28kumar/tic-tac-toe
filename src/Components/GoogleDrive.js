import React from 'react';

const initialData = [
  {
    id: 1,
    type: "folder",
    name: "Test folder",
    content: [
      {
        id: 3,
        type: "file",
        name: "help-1.txt",
      },
      {
        id: 4,
        type: "file",
        name: "help-2.txt",
      },
    ],
  },
  {
    id: 2,
    type: "file",
    name: "help.txt",
  },
];

let idCounter = 100;

// ✅ Recursive helpers

const findById = (arr, id, path = []) => {
  for (let item of arr) {
    if (item.id === id) return { data: item, path: [...path, item] };
    if (item.content) {
      const res = findById(item.content, id, [...path, item]);
      if (res) return res;
    }
  }
  return null;
};

const findByIdAndAdd = (arr, id, newItem) =>
  arr.map((item) =>
    item.id === id && item.type === "folder"
      ? { ...item, content: [...(item.content || []), newItem] }
      : item.content
      ? { ...item, content: findByIdAndAdd(item.content, id, newItem) }
      : item
  );

const updateItemById = (arr, id, newName) =>
  arr.map((item) =>
    item.id === id
      ? { ...item, name: newName }
      : item.content
      ? { ...item, content: updateItemById(item.content, id, newName) }
      : item
  );

const deleteItemById = (arr, id) =>
  arr
    .map((item) =>
      item.id === id
        ? null
        : item.content
        ? { ...item, content: deleteItemById(item.content, id) }
        : item
    )
    .filter(Boolean);

const Drive = () => {
  const [activeId, setActiveId] = React.useState(0);
  const [fullData, setFullData] = React.useState(initialData);
  const [driveData, setDriveData] = React.useState(initialData);
  const [breadCrumbs, setBreadCrumbs] = React.useState([]);

  const refreshView = (newData, id) => {
    if (id === 0) {
      setDriveData(newData);
      setBreadCrumbs([]);
    } else {
      const found = findById(newData, id);
      if (found) {
        setDriveData(found.data.content || []);
        setBreadCrumbs(found.path);
      }
    }
  };

  React.useEffect(() => {
    refreshView(fullData, activeId);
  }, [activeId]);

  const handleCreateItem = (type) => {
    const name = window.prompt(`Enter ${type} name`);
    if (!name) return;

    const newItem = {
      id: idCounter++,
      type,
      name,
      ...(type === "folder" ? { content: [] } : {}),
    };

    const newData =
      activeId === 0
        ? [...fullData, newItem]
        : findByIdAndAdd(fullData, activeId, newItem);

    setFullData(newData);
    refreshView(newData, activeId);
  };

  const handleRename = (id) => {
    const newName = window.prompt("Enter new name:");
    if (!newName) return;
    const newData = updateItemById(fullData, id, newName);
    setFullData(newData);
    refreshView(newData, activeId);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    const newData = deleteItemById(fullData, id);
    setFullData(newData);
    refreshView(newData, activeId);
  };

  return (
    <div className="App">
      <BreadCrumbs data={breadCrumbs} onClick={setActiveId} />
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => handleCreateItem("folder")}>+ Folder</button>
        <button onClick={() => handleCreateItem("file")}>+ File</button>
      </div>
      <FileStructure
        data={driveData}
        onFolderClick={setActiveId}
        onRename={handleRename}
        onDelete={handleDelete}
      />
    </div>
  );
}

const BreadCrumbs = ({ data = [], onClick }) => {
  if (!data.length) return null;
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
      <span style={{ cursor: "pointer" }} onClick={() => onClick(0)}>
        Root/
      </span>
      {data.map((item) => (
        <span key={item.id} style={{ cursor: "pointer" }} onClick={() => onClick(item.id)}>
          {item.name}/
        </span>
      ))}
    </div>
  );
};

const FileStructure = ({ data, onFolderClick, onRename, onDelete }) => {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {data.map((item) =>
        item.type === "folder" ? (
          <FolderDisplay
            key={item.id}
            item={item}
            onClick={onFolderClick}
            onRename={onRename}
            onDelete={onDelete}
          />
        ) : (
          <FileDisplay
            key={item.id}
            item={item}
            onRename={onRename}
            onDelete={onDelete}
          />
        )
      )}
    </div>
  );
};

const FileDisplay = ({ item, onRename, onDelete }) => (
  <div style={{ textAlign: "center" }}>
    <Tile />
    <h4>{item.name}</h4>
    <button onClick={() => onRename(item.id)}>Rename</button>
    <button onClick={() => onDelete(item.id)}>Delete</button>
  </div>
);

const FolderDisplay = ({ item, onClick, onRename, onDelete }) => (
  <div style={{ textAlign: "center" }}>
    <div onClick={() => onClick(item.id)} style={{ cursor: "pointer" }}>
      <Tile />
      <h4>{item.name}</h4>
    </div>
    <button onClick={() => onRename(item.id)}>Rename</button>
    <button onClick={() => onDelete(item.id)}>Delete</button>
  </div>
);

const Tile = () => (
  <div
    style={{
      height: 100,
      width: 100,
      backgroundColor: "yellow",
      marginBottom: 5,
    }}
  />
);



export default Drive;

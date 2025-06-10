import React, { createContext, useContext, useState } from 'react';


export const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

const FileSystemContext = createContext();

const initialData = {
  id: 'root',
  name: 'root',
  type: 'folder',
  children: [
    {
      id: 'f1',
      name: 'Documents',
      type: 'folder',
      children: [
        { id: 'file1', name: 'Resume.pdf', type: 'file' },
        { id: 'file2', name: 'CoverLetter.docx', type: 'file' }
      ]
    },
    {
      id: 'f2',
      name: 'Pictures',
      type: 'folder',
      children: [
        { id: 'file3', name: 'Vacation.png', type: 'file' }
      ]
    },
    { id: 'file4', name: 'todo.txt', type: 'file' }
  ]
};


export const FileSystemProvider = ({ children }) => {
  const [fileSystem, setFileSystem] = useState(initialData);
  const [currentPath, setCurrentPath] = useState(['root']);
  const [searchTerm, setSearchTerm] = useState('');

  const getCurrentFolder = () => {
    let folder = fileSystem;
    for (let i = 1; i < currentPath.length; i++) {
      folder = folder.children.find(child => child.id === currentPath[i]);
    }
    return folder;
  };

  const addItem = (name, type) => {
    const newItem = { id: generateId(), name, type, ...(type === 'folder' && { children: [] }) };
    const folder = getCurrentFolder();
    folder.children.push(newItem);
    setFileSystem({ ...fileSystem });
  };

  const deleteItem = (id) => {
    const folder = getCurrentFolder();
    folder.children = folder.children.filter(item => item.id !== id);
    setFileSystem({ ...fileSystem });
  };

  const renameItem = (id, newName) => {
    const folder = getCurrentFolder();
    const item = folder.children.find(item => item.id === id);
    if (item) item.name = newName;
    setFileSystem({ ...fileSystem });
  };

  const navigateToFolder = (id) => setCurrentPath([...currentPath, id]);
  const navigateToBreadcrumb = (index) => setCurrentPath(currentPath.slice(0, index + 1));

  return (
    <FileSystemContext.Provider value={{
      fileSystem,
      currentPath,
      getCurrentFolder,
      addItem,
      deleteItem,
      renameItem,
      navigateToFolder,
      navigateToBreadcrumb,
      searchTerm,
      setSearchTerm
    }}>
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => useContext(FileSystemContext);

export const Breadcrumbs = () => {
  const { currentPath, navigateToBreadcrumb, fileSystem } = useFileSystem();

  const getNameById = (id) => {
    if (id === 'root') return 'root';
    let node = fileSystem;
    const findNode = (targetId, children) => {
      for (let item of children) {
        if (item.id === targetId) return item.name;
        if (item.type === 'folder') {
          const res = findNode(targetId, item.children);
          if (res) return res;
        }
      }
    };
    return findNode(id, fileSystem.children);
  };

  return (
    <div>
      {currentPath.map((id, index) => (
        <span key={id} onClick={() => navigateToBreadcrumb(index)} style={{ cursor: 'pointer' }}>
          {getNameById(id)} {index !== currentPath.length - 1 && ' / '}
        </span>
      ))}
    </div>
  );
};

export const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useFileSystem();

  return (
    <input
      type="text"
      placeholder="Search by name"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  );
};


export const FolderItem = ({ folder }) => {
  const { navigateToFolder, deleteItem, renameItem } = useFileSystem();

  return (
    <div>
      📁 {folder.name}
      <button onClick={() => navigateToFolder(folder.id)}>Open</button>
      <button onClick={() => deleteItem(folder.id)}>Delete</button>
      <button onClick={() => {
        const name = prompt("Enter new name", folder.name);
        if (name) renameItem(folder.id, name);
      }}>Rename</button>
    </div>
  );
};


const FileItem = ({ file }) => {
  const { deleteItem, renameItem } = useFileSystem();

  return (
    <div>
      📄 {file.name}
      <button onClick={() => deleteItem(file.id)}>Delete</button>
      <button onClick={() => {
        const name = prompt("Enter new name", file.name);
        if (name) renameItem(file.id, name);
      }}>Rename</button>
    </div>
  );
};

const FileManager = () => {
  const { getCurrentFolder, addItem, searchTerm } = useFileSystem();
  const currentFolder = getCurrentFolder();

  const filteredItems = currentFolder.children.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FileSystemProvider>
      <div>
        <h2>File Manager</h2>
        <SearchBar />
        <Breadcrumbs />
        <div>
          <button onClick={() => {
            const name = prompt("Enter folder name");
            if (name) addItem(name, 'folder');
          }}>+ Folder</button>
          <button onClick={() => {
            const name = prompt("Enter file name");
            if (name) addItem(name, 'file');
          }}>+ File</button>
        </div>
        <div style={{ marginTop: '1rem' }}>
          {filteredItems.map(item =>
            item.type === 'folder'
              ? <FolderItem key={item.id} folder={item} />
              : <FileItem key={item.id} file={item} />
          )}
        </div>
      </div>
    </FileSystemProvider>
  );
};

export default FileManager;
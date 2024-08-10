//Types

export interface File {
  id: string;
  name: string;
  size: number;
  type: string;
  createdAt: string;
  folderId?: string;
}

export interface Folder {
  id: string;
  name: string;
  createdAt: string;
  parentId?: string;
}

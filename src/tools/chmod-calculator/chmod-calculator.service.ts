import _ from 'lodash';
import type { GroupPermissions, Permissions } from './chmod-calculator.types';

export { computeChmodOctalRepresentation, computeChmodSymbolicRepresentation, parseChmod };

function computeChmodOctalRepresentation({ permissions }: { permissions: Permissions }): string {
  const permissionValue = { read: 4, write: 2, execute: 1 };

  const getGroupPermissionValue = (permission: GroupPermissions) =>
    _.reduce(permission, (acc, isPermSet, key) => acc + (isPermSet ? _.get(permissionValue, key, 0) : 0), 0);

  return [
    getGroupPermissionValue(permissions.owner),
    getGroupPermissionValue(permissions.group),
    getGroupPermissionValue(permissions.public),
  ].join('');
}

function computeChmodSymbolicRepresentation({ permissions }: { permissions: Permissions }): string {
  const permissionValue = { read: 'r', write: 'w', execute: 'x' };

  const getGroupPermissionValue = (permission: GroupPermissions) =>
    _.reduce(permission, (acc, isPermSet, key) => acc + (isPermSet ? _.get(permissionValue, key, '') : '-'), '');

  return [
    getGroupPermissionValue(permissions.owner),
    getGroupPermissionValue(permissions.group),
    getGroupPermissionValue(permissions.public),
  ].join('');
}

function parseChmod(value: string): Permissions | undefined {
  const cleanValue = value.trim();
  // Support octal like "755" or "0755"
  if (/^[0-7]{3,4}$/.test(cleanValue)) {
    const octal = cleanValue.length === 4 ? cleanValue.substring(1) : cleanValue;
    return {
      owner: { read: (Number.parseInt(octal[0]) & 4) !== 0, write: (Number.parseInt(octal[0]) & 2) !== 0, execute: (Number.parseInt(octal[0]) & 1) !== 0 },
      group: { read: (Number.parseInt(octal[1]) & 4) !== 0, write: (Number.parseInt(octal[1]) & 2) !== 0, execute: (Number.parseInt(octal[1]) & 1) !== 0 },
      public: { read: (Number.parseInt(octal[2]) & 4) !== 0, write: (Number.parseInt(octal[2]) & 2) !== 0, execute: (Number.parseInt(octal[2]) & 1) !== 0 },
    };
  }
  // Support symbolic like "rwxr-xr-x"
  if (/^[r-][w-][x-][r-][w-][x-][r-][w-][x-]$/.test(cleanValue)) {
    return {
      owner: { read: cleanValue[0] === 'r', write: cleanValue[1] === 'w', execute: cleanValue[2] === 'x' },
      group: { read: cleanValue[3] === 'r', write: cleanValue[4] === 'w', execute: cleanValue[5] === 'x' },
      public: { read: cleanValue[6] === 'r', write: cleanValue[7] === 'w', execute: cleanValue[8] === 'x' },
    };
  }
  return undefined;
}

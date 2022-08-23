export default interface IRoute {
  path: string;
  name: string;
  auth: boolean;
  element: any;
  props?: any;
}

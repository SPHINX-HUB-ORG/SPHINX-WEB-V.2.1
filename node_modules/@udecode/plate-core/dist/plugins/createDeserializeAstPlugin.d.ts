export declare const KEY_DESERIALIZE_AST = "deserializeAst";
/**
 * Enables support for deserializing inserted content from Slate Ast format to Slate format
 * while apply a small bug fix.
 */
export declare const createDeserializeAstPlugin: <OP = import("@udecode/utils").AnyObject, OV extends import("@udecode/slate").Value = import("@udecode/slate").Value, OE extends import("..").PlateEditor<OV> = import("..").PlateEditor<OV>>(override?: Partial<import("..").PlatePlugin<import("..").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("..").OverrideByKey<OV, OE>) => import("..").PlatePlugin<import("..").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createDeserializeAstPlugin.d.ts.map
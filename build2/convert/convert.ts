namespace $ {

	/** Source file transpiler. */
	export class $mol_build2_convert extends $mol_object2 {

		static match( file: $mol_file ): boolean {
			return false
		}

		@ $mol_mem
		root() {
			return undefined as any as $mol_build2_root
		}

		@ $mol_mem
		source() {
			return undefined as any as $mol_file
		}

		@ $mol_mem
		generated_artifacts(): $mol_file[] {
			return []
		}

		/** Will be included in further processing (converting, deps searching) */
		@ $mol_mem
		generated_sources(): $mol_file[] {
			return []
		}

		artifacts_for( slice: $mol_build2_slice ): $mol_file[] {
			return this.generated_artifacts()
		}

	}

}

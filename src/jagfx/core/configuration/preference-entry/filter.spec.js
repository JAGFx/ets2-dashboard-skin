import { PreferenceEntry } from "@/jagfx/core/configuration/preference-entry/PreferenceEntry";
import { applyFiltersToPreferenceEntriesList } from "@/jagfx/core/configuration/preference-entry/filter";

const existingConfiguration = [
  {
    id: "an_existing_configuration_id",
    target: "application",
    label: "Configuration 1",
    description: "Description 1",
    values: [
      {
        label: "Value 1",
        value: "value1",
      },
    ],
  },
  {
    id: "another_existing_configuration_id",
    target: "application",
    label: "Unicorn label 2",
    description: "Description 2",
    values: null,
  },
];

describe("Preference entry filter", () => {
  const unknownFilters = [
    [],
    {},
    "",
    "string",
    123,
    undefined,
    null,
    new PreferenceEntry(),
    { label: "" },
    { target: "" },
    { label: "", target: "" },
  ];

  it.each(unknownFilters)(
    "Preference entries must not have any differences with invalid filters",
    (filter) => {
      expect(
        applyFiltersToPreferenceEntriesList(filter, existingConfiguration)
      ).toStrictEqual(existingConfiguration);
    }
  );

  const validFilters = [
    { label: "Unicorn label 2" },
    { label: "unicorn label 2" },
    { label: "LaBeL" },
    { label: "uni" },
    { label: "2" },
    { label: "uni", target: "app" },
    { label: "uni", target: "application" },
  ];
  it.each(validFilters)(
    "A preference entry must be returned with matched filters",
    (filter) => {
      expect(
        applyFiltersToPreferenceEntriesList(filter, existingConfiguration).at(0)
      ).toStrictEqual(existingConfiguration.at(1));
    }
  );
});

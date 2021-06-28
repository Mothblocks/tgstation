import { classes } from "common/react";
import { sendAct, useBackend, useLocalState } from "../../backend";
import { Box, Button, ByondUi, FitText, Flex, Icon, Input, Popper, Stack } from "../../components";
import { createSetPreference, PreferencesMenuData } from "./data";
import { CharacterPreview } from "./CharacterPreview";
import { Gender, GENDERS } from "./preferences/gender";

const CLOTHING_CELL_SIZE = 32;
const CLOTHING_SIDEBAR_ROWS = 9;

const CLOTHING_SELECTION_CELL_SIZE = 48;
const CLOTHING_SELECTION_WIDTH = 5.4;
const CLOTHING_SELECTION_MULTIPLIER = 5.2;

// MOTHBLOCKS TODO: Put this in the datum, or perhaps derive it?
const KEYS_TO_NAMES = {
  backpack: "backpack",
  underwear: "underwear",
};

const CharacterControls = (props: {
  handleRotate: () => void,
  gender: Gender,
  setGender: (gender: Gender) => void,
}) => {
  return (
    <Stack>
      <Stack.Item>
        <Button
          onClick={props.handleRotate}
          fontSize="16px"
          icon="undo"
        />
      </Stack.Item>

      <Stack.Item>
        <GenderButton gender={props.gender} handleSetGender={props.setGender} />
      </Stack.Item>
    </Stack>
  );
};

const ClothingSelection = (props: {
  name: string,
  catalog: Record<string, string>,
  selected: string,
  onSelect: (value: string) => void,
}) => {
  return (
    <Box style={{
      background: "white",
      padding: "5px",
      width: `${CLOTHING_SELECTION_CELL_SIZE * CLOTHING_SELECTION_WIDTH}px`,
      height:
        `${CLOTHING_SELECTION_CELL_SIZE * CLOTHING_SELECTION_MULTIPLIER}px`,
    }}>
      <Stack vertical fill>
        <Stack.Item>
          <Box style={{
            "border-bottom": "1px solid #888",
            "font-size": "14px",
            "text-align": "center",
          }}>Select {props.name}
          </Box>
        </Stack.Item>

        <Stack.Item overflowY="scroll">
          <Flex wrap>
            {Object.entries(props.catalog).map(([name, image], index) => {
              return (
                <Flex.Item
                  key={index}
                  basis={`${CLOTHING_SELECTION_CELL_SIZE}px`}
                  style={{
                    padding: "5px",
                  }}
                >
                  <Button
                    onClick={() => {
                      props.onSelect(name);
                    }}
                    selected={name === props.selected}
                    tooltip={name}
                    tooltipPosition="right"
                    style={{
                      height: `${CLOTHING_SELECTION_CELL_SIZE}px`,
                      width: `${CLOTHING_SELECTION_CELL_SIZE}px`,
                    }}
                  >
                    <Box className={classes(["preferences32x32", image, "centered-image"])} />
                  </Button>
                </Flex.Item>
              );
            })}
          </Flex>
        </Stack.Item>
      </Stack>
    </Box>
  );
};

const GenderButton = (props: {
  handleSetGender: (gender: Gender) => void,
  gender: Gender,
}, context) => {
  const [genderMenuOpen, setGenderMenuOpen] = useLocalState(context, "genderMenuOpen", false);

  return (
    <Popper options={{
      placement: "right-end",
    }} popperContent={(
      genderMenuOpen
        && (
          <Stack backgroundColor="white" ml={0.5} p={0.3}>
            {[Gender.Male, Gender.Female, Gender.Other].map(gender => {
              return (
                <Stack.Item key={gender}>
                  <Button
                    selected={gender === props.gender}
                    onClick={() => {
                      props.handleSetGender(gender);
                      setGenderMenuOpen(false);
                    }}
                    fontSize="16px"
                    icon={GENDERS[gender].icon}
                    tooltip={GENDERS[gender].text}
                    tooltipPosition="top"
                  />
                </Stack.Item>
              );
            })}
          </Stack>
        )
    )}>
      <Button
        onClick={() => {
          setGenderMenuOpen(!genderMenuOpen);
        }}
        fontSize="16px"
        icon={GENDERS[props.gender].icon}
        tooltip="Gender"
        tooltipPosition="top"
      />
    </Popper>
  );
};

const NameItem = (props) => {
  return (
    <Stack.Item style={{
      position: "relative",
    }}>
      <Button fontSize="20px" textAlign="center" width="100%">
        <Box as="span" width="97%">
          <Icon name="edit" opacity="60%" />

          <FitText maxFontSize={18} maxWidth={150}>
            {props.name}
          </FitText>
        </Box>
      </Button>

      <Button as="span" tooltip="Alternate Names" tooltipPosition="bottom" style={{
        background: "rgba(0, 0, 0, 0.7)",
        position: "absolute",
        right: "2px",
        top: "20%",
        width: "2%",
      }}>
        <Icon name="ellipsis-v" style={{
          "position": "relative",
          "left": "1px",
          "min-width": "0px",
        }} />
      </Button>
    </Stack.Item>
  );
};

export const MainPage = (props, context) => {
  const { act, data } = useBackend<PreferencesMenuData>(context);
  const [currentClothingMenu, setCurrentClothingMenu] = useLocalState(context, "currentClothingMenu", null);

  const requestPreferenceData = (key: string) => {
    act("request_values", {
      preference: key,
    });
  };

  return (
    <Stack fill>
      <Stack.Item>
        <Stack vertical>
          <Stack.Item>
            <CharacterControls
              gender={data.character_preferences.misc.gender}
              handleRotate={() => {
                act("rotate");
              }}
              setGender={createSetPreference(act, "gender")}
            />
          </Stack.Item>

          <Stack.Item>
            <CharacterPreview
              height={`${CLOTHING_SIDEBAR_ROWS * CLOTHING_CELL_SIZE}px`}
              id={data.character_preview_view} />
          </Stack.Item>

          <NameItem name="Lord Sport Shooter Gavin XBIV" />
          <NameItem name="Jimmy Pneumonoultramicroscopicsilicovolcan" />
          <NameItem name="Capt. Paxium LXIX" />
          <NameItem name="Mothblocks" />
          <NameItem name="Asher Feigenbaum" />
        </Stack>
      </Stack.Item>

      <Stack.Item>
        <Stack
          vertical
          fill
          width={`${CLOTHING_CELL_SIZE}px`}
        >
          {Object.entries(data.character_preferences.clothing)
            .map(([clothingKey, clothing]) => {
              // MOTHBLOCKS TODO: Better nude icons, rather than X
              return (
                <Stack.Item key={clothingKey}>
                  <Popper options={{
                    placement: "bottom-start",
                  }} popperContent={
                    (currentClothingMenu === clothingKey
                  && data.generated_preference_values
                  && data.generated_preference_values[clothingKey])
                && <ClothingSelection
                  name={KEYS_TO_NAMES[clothingKey]
                    || `NO NAME FOR ${clothingKey}`}
                  catalog={
                    data.generated_preference_values[clothingKey]
                  }
                  selected={clothing.value}
                  onSelect={createSetPreference(act, clothingKey)}
                />
                  }>
                    <Button onClick={() => {
                      setCurrentClothingMenu(
                        currentClothingMenu === clothingKey
                          ? null
                          : clothingKey
                      );

                      requestPreferenceData(clothingKey);
                    }} style={{
                      height: `${CLOTHING_CELL_SIZE}px`,
                      width: `${CLOTHING_CELL_SIZE}px`,
                    }} tooltip={clothing.value} tooltipPosition="right">
                      <Box
                        className={classes([
                          "preferences32x32",
                          clothing.icon,
                          "centered-image",
                        ])} />
                    </Button>
                  </Popper>
                </Stack.Item>
              );
            })}
        </Stack>
      </Stack.Item>
    </Stack>
  );
};

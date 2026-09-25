import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import * as path from 'path';

@Injectable()
export class DatabaseService {
  // Use DATA_FILE_PATH from environment variables, with a fallback path
  private readonly filePath = process.env.DATA_FILE_PATH || './data/campus-rate.json';

  /**
   * Checks if the JSON file exists. If not, creates it with an empty structure.
   */
  private async ensureFileExists() {
    try {
      await fs.access(this.filePath);
    } catch {
      // File doesn't exist, let's create it with default empty collections
      const initialData = { places: [], appreciations: [] };
      
      // Ensure the directory exists first
      const dir = path.dirname(this.filePath);
      await fs.mkdir(dir, { recursive: true });
      
      await fs.writeFile(this.filePath, JSON.stringify(initialData, null, 2), 'utf8');
    }
  }

  /**
   * Reads and parses data from the JSON file.
   * Handles invalid JSON (SyntaxError) as required by Section 8.
   */
  async readDatabase(): Promise<{ places: any[]; appreciations: any[] }> {
    await this.ensureFileExists();

    try {
      const fileContent = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(fileContent);
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Section 8 requirement: detect invalid JSON and produce a controlled error
        throw new InternalServerErrorException(
          'Erreur critique : Le fichier de données JSON est corrompu ou invalide.'
        );
      }
      throw error;
    }
  }

  /**
   * Writes the updated data back to the JSON file asynchronously.
   */
  async writeDatabase(data: { places: any[]; appreciations: any[] }): Promise<void> {
    await this.ensureFileExists();
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }
}